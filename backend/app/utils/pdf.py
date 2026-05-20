"""
utils/pdf.py
Generador de PDF profesional para queja VPMRG.
Usa ReportLab con estilos formales, protección de datos y folio único.
"""

import hashlib
from datetime import datetime
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    Table, TableStyle, KeepTogether,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter


# ── Paleta institucional ──────────────────────────────────────────────────────
MORADO      = colors.HexColor("#5c2d91")   # color principal de la plataforma
MORADO_CLARO = colors.HexColor("#ede9f5")
GRIS_OSCURO = colors.HexColor("#374151")
GRIS_MEDIO  = colors.HexColor("#6b7280")
ROJO        = colors.HexColor("#dc2626")
BLANCO      = colors.white


def _anonimizar_id(caso_id: str) -> str:
    """Genera un folio público corto a partir del UUID interno."""
    return "VPMRG-" + hashlib.sha256(caso_id.encode()).hexdigest()[:8].upper()


def _estilos():
    base = getSampleStyleSheet()

    titulo_doc = ParagraphStyle(
        "TituloDoc",
        parent=base["Normal"],
        fontSize=15,
        fontName="Helvetica-Bold",
        textColor=MORADO,
        alignment=TA_CENTER,
        spaceAfter=4,
    )
    subtitulo_doc = ParagraphStyle(
        "SubtituloDoc",
        parent=base["Normal"],
        fontSize=10,
        fontName="Helvetica",
        textColor=GRIS_MEDIO,
        alignment=TA_CENTER,
        spaceAfter=2,
    )
    seccion = ParagraphStyle(
        "Seccion",
        parent=base["Normal"],
        fontSize=9,
        fontName="Helvetica-Bold",
        textColor=MORADO,
        spaceBefore=14,
        spaceAfter=4,
        textTransform="uppercase",
        letterSpacing=0.5,
    )
    cuerpo = ParagraphStyle(
        "Cuerpo",
        parent=base["Normal"],
        fontSize=10,
        fontName="Helvetica",
        textColor=GRIS_OSCURO,
        leading=15,
        alignment=TA_JUSTIFY,
        spaceAfter=6,
    )
    cuerpo_bold = ParagraphStyle(
        "CuerpoBold",
        parent=cuerpo,
        fontName="Helvetica-Bold",
        alignment=TA_LEFT,
    )
    pie = ParagraphStyle(
        "Pie",
        parent=base["Normal"],
        fontSize=8,
        fontName="Helvetica",
        textColor=GRIS_MEDIO,
        alignment=TA_CENTER,
        spaceBefore=4,
    )
    aviso = ParagraphStyle(
        "Aviso",
        parent=base["Normal"],
        fontSize=8,
        fontName="Helvetica-Oblique",
        textColor=GRIS_MEDIO,
        alignment=TA_JUSTIFY,
        leading=12,
    )
    nivel_chip = ParagraphStyle(
        "NivelChip",
        parent=base["Normal"],
        fontSize=10,
        fontName="Helvetica-Bold",
        textColor=BLANCO,
        alignment=TA_CENTER,
    )
    return dict(
        titulo_doc=titulo_doc,
        subtitulo_doc=subtitulo_doc,
        seccion=seccion,
        cuerpo=cuerpo,
        cuerpo_bold=cuerpo_bold,
        pie=pie,
        aviso=aviso,
        nivel_chip=nivel_chip,
    )


def _nivel_color(nivel: str) -> colors.Color:
    n = (nivel or "").lower()
    if n == "alto":
        return colors.HexColor("#dc2626")
    if n == "medio":
        return colors.HexColor("#d97706")
    return colors.HexColor("#16a34a")


def _nivel_texto(nivel: str) -> str:
    mapa = {
        "alto": "RIESGO ALTO",
        "medio": "RIESGO MEDIO",
        "bajo": "RIESGO BAJO",
        "no_identificado": "NO IDENTIFICADO",
    }
    return mapa.get((nivel or "").lower(), "NO IDENTIFICADO")


# ── Encabezado de página ──────────────────────────────────────────────────────

def _header_footer(canvas, doc, folio: str, fecha: str):
    canvas.saveState()
    w, h = letter

    # Banda superior morada
    canvas.setFillColor(MORADO)
    canvas.rect(0, h - 1.8 * cm, w, 1.8 * cm, fill=1, stroke=0)

    # Título en la banda
    canvas.setFillColor(BLANCO)
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawString(1.5 * cm, h - 1.1 * cm, "Orientación Jurídica — Violencia Política en Razón de Género")
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(w - 1.5 * cm, h - 1.1 * cm, f"Folio: {folio}")

    # Pie de página
    canvas.setFillColor(GRIS_MEDIO)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(1.5 * cm, 0.9 * cm,
        "Documento generado con fines orientativos. No sustituye asesoría jurídica profesional.")
    canvas.drawRightString(w - 1.5 * cm, 0.9 * cm,
        f"Página {doc.page}   ·   {fecha}")

    # Línea separadora del pie
    canvas.setStrokeColor(colors.HexColor("#e5e7eb"))
    canvas.setLineWidth(0.5)
    canvas.line(1.5 * cm, 1.4 * cm, w - 1.5 * cm, 1.4 * cm)

    canvas.restoreState()


# ── Función principal ─────────────────────────────────────────────────────────

def generate_pdf(
    user_message: str,
    ai_response: dict,
    relato_formal: dict = None,
    datos_quejosa: dict = None,
    caso_id: str = "sin-id",
    pdf_path: str = "reporte.pdf",
):
    folio = _anonimizar_id(caso_id)
    fecha = datetime.now().strftime("%d/%m/%Y  %H:%M hrs")
    s = _estilos()

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        topMargin=2.6 * cm,
        bottomMargin=2.0 * cm,
        leftMargin=2.0 * cm,
        rightMargin=2.0 * cm,
        title=f"Orientación VPMRG — {folio}",
        author="Plataforma VPMRG CDMX",
        subject="Violencia política en razón de género",
        creator="Sistema de orientación jurídica",
    )

    elems = []

    # ── Bloque de identificación del documento ──
    elems.append(Spacer(1, 0.3 * cm))
    elems.append(Paragraph("REPORTE DE ORIENTACIÓN JURÍDICA", s["titulo_doc"]))
    elems.append(Paragraph("Violencia Política en Razón de Género (VPMRG) — Ciudad de México", s["subtitulo_doc"]))
    elems.append(Spacer(1, 0.2 * cm))

    # Tabla de metadatos del documento
    meta_data = [
        ["Folio del caso:", folio,         "Fecha de emisión:", fecha],
        ["Jurisdicción:", "Ciudad de México",  "Carácter:", "Confidencial — Uso interno"],
    ]
    meta_table = Table(meta_data, colWidths=[3.8 * cm, 5.8 * cm, 3.8 * cm, 5.5 * cm])
    meta_table.setStyle(TableStyle([
        ("BACKGROUND",  (0, 0), (-1, -1), MORADO_CLARO),
        ("FONTNAME",    (0, 0), (0, -1),  "Helvetica-Bold"),
        ("FONTNAME",    (2, 0), (2, -1),  "Helvetica-Bold"),
        ("FONTNAME",    (1, 0), (1, -1),  "Helvetica"),
        ("FONTNAME",    (3, 0), (3, -1),  "Helvetica"),
        ("FONTSIZE",    (0, 0), (-1, -1), 8.5),
        ("TEXTCOLOR",   (0, 0), (-1, -1), GRIS_OSCURO),
        ("GRID",        (0, 0), (-1, -1), 0.4, colors.HexColor("#c4b5e0")),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [MORADO_CLARO, colors.HexColor("#f5f3ff")]),
        ("TOPPADDING",  (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ]))
    elems.append(meta_table)
    elems.append(Spacer(1, 0.4 * cm))

    # ── Aviso de protección de datos ──
    aviso_privacidad = (
        "<b>AVISO DE PRIVACIDAD:</b> Este documento ha sido generado de forma anónima. "
        "No contiene datos personales identificables. El folio de caso es un identificador "
        "técnico cifrado que no permite vincular el contenido con ninguna persona física. "
        "La información aquí contenida es de carácter estrictamente confidencial y está "
        "protegida conforme a la Ley General de Protección de Datos Personales en Posesión "
        "de Sujetos Obligados (LGPDPPSO) y la normativa aplicable en la CDMX."
    )
    elems.append(Paragraph(aviso_privacidad, s["aviso"]))
    elems.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e5e7eb"), spaceAfter=8))

    # ── SECCIÓN I: RELATO ANONIMIZADO ──
    elems.append(Paragraph("I. Relato de la afectada", s["seccion"]))
    elems.append(Paragraph(
        "El siguiente relato fue proporcionado de forma voluntaria y anónima por la usuaria "
        "a través de la plataforma de orientación jurídica:",
        s["cuerpo"]
    ))
    # Recuadro del relato
    relato_limpio = (user_message or "").replace("<", "&lt;").replace(">", "&gt;")
    relato_table = Table(
        [[Paragraph(f'"{relato_limpio}"', ParagraphStyle(
            "RelatoInner", parent=s["cuerpo"],
            fontName="Helvetica-Oblique", textColor=GRIS_OSCURO,
            alignment=TA_JUSTIFY, leading=14,
        ))]],
        colWidths=[17.7 * cm],
    )
    relato_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), colors.HexColor("#fafafa")),
        ("LEFTPADDING",   (0, 0), (-1, -1), 14),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 14),
        ("TOPPADDING",    (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LINEBEFORE",    (0, 0), (0, -1),  4, MORADO),
        ("BOX",           (0, 0), (-1, -1), 0.5, colors.HexColor("#e5e7eb")),
        ("ROUNDEDCORNERS", [4]),
    ]))
    elems.append(relato_table)
    elems.append(Spacer(1, 0.3 * cm))

    # ── SECCIÓN II: RESULTADO DEL ANÁLISIS ──
    elems.append(Paragraph("II. Resultado del análisis de riesgo", s["seccion"]))

    nivel = ai_response.get("nivel_vpmrg", "no_identificado")
    nivel_color = _nivel_color(nivel)
    nivel_texto = _nivel_texto(nivel)

    nivel_table = Table(
        [[Paragraph(nivel_texto, s["nivel_chip"])]],
        colWidths=[5 * cm],
    )
    nivel_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), nivel_color),
        ("TOPPADDING",    (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING",   (0, 0), (-1, -1), 12),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 12),
        ("ROUNDEDCORNERS", [4]),
    ]))
    elems.append(nivel_table)
    elems.append(Spacer(1, 0.3 * cm))

    resumen = ai_response.get("resumen_orientacion", "")
    if resumen:
        elems.append(Paragraph("<b>Orientación inicial:</b>", s["cuerpo_bold"]))
        elems.append(Paragraph(resumen, s["cuerpo"]))

    # ── Conductas identificadas ──
    conductas = ai_response.get("conductas", [])
    if conductas:
        elems.append(Paragraph("Conductas de violencia política identificadas:", s["cuerpo_bold"]))
        for idx, c in enumerate(conductas, 1):
            elems.append(Paragraph(f"{idx}. {c}", s["cuerpo"]))

    # ── Derechos vulnerados ──
    derechos = ai_response.get("derechos_vulnerados", [])
    if derechos:
        elems.append(Paragraph("Derechos político-electorales vulnerados:", s["cuerpo_bold"]))
        for idx, d in enumerate(derechos, 1):
            elems.append(Paragraph(f"{idx}. {d}", s["cuerpo"]))

    elems.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e5e7eb"), spaceAfter=8))

    # ── SECCIÓN III: QUEJA FORMAL (si existe) ──
    if relato_formal and datos_quejosa:
        elems.append(Paragraph("III. Queja formal estructurada", s["seccion"]))
        elems.append(Paragraph(
            "El siguiente documento fue estructurado por inteligencia artificial con base en el relato "
            "anonimizado y los datos del caso. Debe ser revisado y firmado por la quejosa antes de su presentación.",
            s["cuerpo"]
        ))
        elems.append(Spacer(1, 0.2 * cm))

        cargo = datos_quejosa.get("cargo_funcion", "cargo no especificado")
        alcaldia = datos_quejosa.get("municipio_alcaldia", "alcaldía no especificada")
        autoridad = datos_quejosa.get("autoridad_denunciada", "no especificada")

        # Datos del caso (tabla)
        caso_data = [
            ["Cargo/función de la quejosa:", cargo],
            ["Alcaldía donde ocurrieron los hechos:", alcaldia],
            ["Autoridad denunciada:", autoridad],
        ]
        caso_table = Table(caso_data, colWidths=[7 * cm, 10.7 * cm])
        caso_table.setStyle(TableStyle([
            ("FONTNAME",    (0, 0), (0, -1), "Helvetica-Bold"),
            ("FONTNAME",    (1, 0), (1, -1), "Helvetica"),
            ("FONTSIZE",    (0, 0), (-1, -1), 9),
            ("TEXTCOLOR",   (0, 0), (-1, -1), GRIS_OSCURO),
            ("ROWBACKGROUNDS", (0, 0), (-1, -1), [MORADO_CLARO, colors.HexColor("#f5f3ff")]),
            ("GRID",        (0, 0), (-1, -1), 0.4, colors.HexColor("#c4b5e0")),
            ("TOPPADDING",  (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ]))
        elems.append(caso_table)
        elems.append(Spacer(1, 0.4 * cm))

        secciones_queja = [
            ("I. PROEMIO", relato_formal.get("proemio", "")),
            ("II. ANTECEDENTES", relato_formal.get("antecedentes", "")),
            ("III. HECHOS ORDENADOS CRONOLÓGICAMENTE", relato_formal.get("hechos_ordenados", "")),
        ]
        for titulo_sec, contenido in secciones_queja:
            if contenido:
                elems.append(KeepTogether([
                    Paragraph(titulo_sec, ParagraphStyle(
                        "SeccionQueja", parent=s["cuerpo_bold"],
                        fontSize=10, textColor=MORADO, spaceBefore=10, spaceAfter=4,
                    )),
                    Paragraph(contenido, s["cuerpo"]),
                ]))

        elems.append(Spacer(1, 0.6 * cm))

        # Espacio para firma
        firma_data = [
            ["_" * 35, "", "_" * 35],
            ["Firma de la quejosa", "", "Fecha y lugar"],
            ["(nombre protegido — solo original)", "", ""],
        ]
        firma_table = Table(firma_data, colWidths=[7.5 * cm, 2.7 * cm, 7.5 * cm])
        firma_table.setStyle(TableStyle([
            ("FONTNAME",    (0, 0), (-1, -1), "Helvetica"),
            ("FONTSIZE",    (0, 0), (-1, -1), 8.5),
            ("TEXTCOLOR",   (0, 0), (-1, -1), GRIS_MEDIO),
            ("ALIGN",       (0, 0), (-1, -1), "CENTER"),
            ("TOPPADDING",  (0, 0), (-1, -1), 3),
        ]))
        elems.append(firma_table)
        elems.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e5e7eb"), spaceAfter=8))

    # ── SECCIÓN IV: Recursos de apoyo ──
    elems.append(Paragraph("IV. Recursos de apoyo urgente — Ciudad de México", s["seccion"]))

    recursos = [
        ["🆘 Emergencias", "911", "Situaciones de peligro inmediato"],
        ["📞 Línea Mujeres CDMX", "800 108 4053", "Atención 24 horas, todos los días"],
        ["⚖️ IECM", "55 5133 1111", "Instituto Electoral Ciudad de México"],
        ["🏛️ CNDH", "800 715 2000", "Comisión Nacional de Derechos Humanos"],
        ["🔒 FEVIMTRA", "800 835 4632", "Delitos contra la mujer (FGR)"],
    ]
    rec_table = Table(recursos, colWidths=[5 * cm, 4.2 * cm, 8.5 * cm])
    rec_table.setStyle(TableStyle([
        ("FONTNAME",    (0, 0), (-1, -1), "Helvetica"),
        ("FONTNAME",    (1, 0), (1, -1),  "Helvetica-Bold"),
        ("FONTSIZE",    (0, 0), (-1, -1), 9),
        ("TEXTCOLOR",   (0, 0), (-1, -1), GRIS_OSCURO),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [BLANCO, colors.HexColor("#f9fafb")]),
        ("GRID",        (0, 0), (-1, -1), 0.4, colors.HexColor("#e5e7eb")),
        ("TOPPADDING",  (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
    ]))
    elems.append(rec_table)
    elems.append(Spacer(1, 0.4 * cm))

    # ── Pie legal final ──
    elems.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e5e7eb"), spaceAfter=6))
    elems.append(Paragraph(
        f"Este documento fue generado automáticamente el {fecha} mediante la plataforma de orientación jurídica "
        "para mujeres en situación de violencia política en razón de género (VPMRG). "
        "Su contenido tiene carácter orientativo y no constituye un dictamen jurídico. "
        "Se recomienda su revisión por parte de una persona asesora jurídica calificada antes de cualquier "
        "presentación formal ante autoridades.",
        s["aviso"]
    ))

    # ── Build con encabezado/pie en cada página ──
    doc.build(
        elems,
        onFirstPage=lambda c, d: _header_footer(c, d, folio, fecha),
        onLaterPages=lambda c, d: _header_footer(c, d, folio, fecha),
    )
    return pdf_path