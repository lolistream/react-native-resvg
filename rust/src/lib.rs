use std::collections::HashSet;
use std::str::FromStr;
use std::sync::{Arc, Mutex};

use resvg::tiny_skia::{Color, IntSize, Pixmap, Transform};
use resvg::usvg::fontdb::Database;
use resvg::usvg::{self, Size, Tree};

#[derive(Debug, thiserror::Error, uniffi::Error)]
pub enum ResvgError {
    #[error("{msg}")]
    InvalidDimensions { msg: String },
    #[error("{msg}")]
    SvgParse { msg: String },
    #[error("{msg}")]
    PngEncode { msg: String },
}

#[derive(uniffi::Object)]
pub struct Converter {
    fonts: Mutex<Vec<Vec<u8>>>,
    serif_family: Option<String>,
    sans_serif_family: Option<String>,
    cursive_family: Option<String>,
    fantasy_family: Option<String>,
    monospace_family: Option<String>,
}

#[uniffi::export]
impl Converter {
    #[uniffi::constructor]
    pub fn new(
        serif_family: Option<String>,
        sans_serif_family: Option<String>,
        cursive_family: Option<String>,
        fantasy_family: Option<String>,
        monospace_family: Option<String>,
    ) -> Self {
        Self {
            fonts: Mutex::new(Vec::new()),
            serif_family,
            sans_serif_family,
            cursive_family,
            fantasy_family,
            monospace_family,
        }
    }

    pub fn register_font(&self, font: Vec<u8>) {
        self.fonts.lock().unwrap().push(font);
    }

    pub fn convert(
        &self,
        svg: String,
        scale: Option<f32>,
        width: Option<f32>,
        height: Option<f32>,
        background: Option<String>,
    ) -> Result<Vec<u8>, ResvgError> {
        let fonts = self.fonts.lock().unwrap();
        let fontdb = build_fontdb(
            &fonts,
            self.serif_family.as_deref(),
            self.sans_serif_family.as_deref(),
            self.cursive_family.as_deref(),
            self.fantasy_family.as_deref(),
            self.monospace_family.as_deref(),
        );

        let default_font_family = if fontdb.is_empty() {
            "sans-serif".to_string()
        } else {
            fontdb.faces().next().unwrap().families[0].0.to_string()
        };

        let default_size = Size::from_wh(width.unwrap_or(100.0), height.unwrap_or(100.0))
            .ok_or(ResvgError::InvalidDimensions {
                msg: "Invalid default size".into(),
            })?;

        let opts = usvg::Options {
            font_family: default_font_family,
            default_size,
            fontdb: Arc::new(fontdb),
            ..Default::default()
        };

        let scale = scale.unwrap_or(1.0);
        let tree = Tree::from_str(&svg, &opts)
            .map_err(|e| ResvgError::SvgParse { msg: e.to_string() })?;

        let svg_size = tree.size();
        let (px_w, px_h) = match (width, height) {
            (Some(w), Some(h)) => (w.round() as u32, h.round() as u32),
            (Some(w), _) => (
                w.round() as u32,
                (svg_size.height() * (w / svg_size.width())) as u32,
            ),
            (_, Some(h)) => (
                (svg_size.width() * (h / svg_size.height())) as u32,
                h.round() as u32,
            ),
            _ => (
                (svg_size.width().round() * scale) as u32,
                (svg_size.height().round() * scale) as u32,
            ),
        };

        let mut pixmap = Pixmap::new(px_w, px_h).ok_or(ResvgError::InvalidDimensions {
            msg: "Cannot create pixmap with given dimensions".into(),
        })?;

        if let Some(ref bg) = background {
            pixmap.fill(parse_color(bg));
        }

        let original = tree.size().to_int_size();
        let scaled = IntSize::from_wh(px_w, px_h)
            .map(|target| original.scale_to(target))
            .unwrap_or(original);

        let tx = Transform::from_scale(
            scaled.width() as f32 / original.width() as f32,
            scaled.height() as f32 / original.height() as f32,
        );

        resvg::render(&tree, tx, &mut pixmap.as_mut());

        pixmap
            .encode_png()
            .map_err(|e| ResvgError::PngEncode { msg: e.to_string() })
    }

    pub fn list_fonts(&self) -> Vec<String> {
        let fonts = self.fonts.lock().unwrap();
        build_fontdb(&fonts, None, None, None, None, None)
            .faces()
            .map(|f| f.families[0].0.clone())
            .collect::<HashSet<String>>()
            .into_iter()
            .collect()
    }
}

uniffi::setup_scaffolding!();

fn build_fontdb(
    fonts: &[Vec<u8>],
    serif: Option<&str>,
    sans_serif: Option<&str>,
    cursive: Option<&str>,
    fantasy: Option<&str>,
    monospace: Option<&str>,
) -> Database {
    let mut db = Database::new();
    for font in fonts {
        db.load_font_data(font.to_vec());
    }
    if let Some(f) = serif { db.set_serif_family(f) }
    if let Some(f) = sans_serif { db.set_sans_serif_family(f) }
    if let Some(f) = cursive { db.set_cursive_family(f) }
    if let Some(f) = fantasy { db.set_fantasy_family(f) }
    if let Some(f) = monospace { db.set_monospace_family(f) }
    db
}

fn parse_color(color: &str) -> Color {
    svgtypes::Color::from_str(color)
        .map(|c| Color::from_rgba8(c.red, c.green, c.blue, c.alpha))
        .unwrap_or(Color::TRANSPARENT)
}