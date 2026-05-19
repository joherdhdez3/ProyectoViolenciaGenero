from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf(
    user_message: str,
    ai_response: dict,
    relato_formal: dict = None,
    datos_quejosa: dict = None,
    pdf_path: str = "reporte.pdf",
):
    doc    = SimpleDocTemplate(pdf_path)
    styles = getSampleStyleSheet()
    elems  = []

    elems.append(Paragraph("Reporte de Orientación VPMRG", styles["Title"]))
    elems.append(Spacer(1, 16))

    elems.append(Paragraph("<b>Relato de la usuaria:</b>", styles["BodyText"]))
    elems.append(Paragraph(user_message, styles["BodyText"]))
    elems.append(Spacer(1, 12))

    nivel = ai_response.get("nivel_vpmrg", "no identificado")
    elems.append(Paragraph(f"<b>Nivel de riesgo VPMRG:</b> {nivel.upper()}", styles["BodyText"]))
    elems.append(Spacer(1, 10))

    conductas = ai_response.get("conductas", [])
    if conductas:
        elems.append(Paragraph("<b>Conductas identificadas:</b>", styles["BodyText"]))
        for c in conductas:
            elems.append(Paragraph(f"• {c}", styles["BodyText"]))
    elems.append(Spacer(1, 10))

    derechos = ai_response.get("derechos_vulnerados", [])
    if derechos:
        elems.append(Paragraph("<b>Derechos vulnerados:</b>", styles["BodyText"]))
        for d in derechos:
            elems.append(Paragraph(f"• {d}", styles["BodyText"]))
    elems.append(Spacer(1, 10))

    resumen = ai_response.get("resumen_orientacion", "")
    if resumen:
        elems.append(Paragraph(f"<b>Orientación inicial:</b> {resumen}", styles["BodyText"]))
    elems.append(Spacer(1, 20))

    if relato_formal and datos_quejosa:
        elems.append(Paragraph("─" * 60, styles["BodyText"]))
        elems.append(Spacer(1, 10))
        elems.append(Paragraph("QUEJA FORMAL ESTRUCTURADA", styles["Heading2"]))
        elems.append(Spacer(1, 10))

        proemio = relato_formal.get("proemio", "")
        if proemio:
            elems.append(Paragraph("<b>Proemio:</b>", styles["BodyText"]))
            elems.append(Paragraph(proemio, styles["BodyText"]))
            elems.append(Spacer(1, 10))

        antecedentes = relato_formal.get("antecedentes", "")
        if antecedentes:
            elems.append(Paragraph("<b>Antecedentes:</b>", styles["BodyText"]))
            elems.append(Paragraph(antecedentes, styles["BodyText"]))
            elems.append(Spacer(1, 10))

        hechos = relato_formal.get("hechos_ordenados", "")
        if hechos:
            elems.append(Paragraph("<b>Hechos:</b>", styles["BodyText"]))
            elems.append(Paragraph(hechos, styles["BodyText"]))
            elems.append(Spacer(1, 20))

    elems.append(Paragraph(
        "<b>Recursos de apoyo CDMX:</b><br/>"
        "Línea Mujeres: 56581111<br/>"
        "IECM: 55-5133-1111<br/>"
        "Emergencias: 911",
        styles["BodyText"],
    ))

    doc.build(elems)
    return pdf_path