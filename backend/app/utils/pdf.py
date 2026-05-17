from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus import Paragraph
from reportlab.platypus import Spacer

from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf(user_message: str, ai_response: dict):
    pdf_path = "reporte.pdf"
    doc = SimpleDocTemplate(pdf_path)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("Reporte de Orientación", styles["Title"]))
    elements.append(Spacer(1, 20))
    elements.append(Paragraph(f"<b>Mensaje:</b> {user_message}", styles["BodyText"]))
    elements.append(Spacer(1, 12))

    nivel = ai_response.get("nivel_vpmrg", "no identificado")
    elements.append(Paragraph(f"<b>Nivel de riesgo:</b> {nivel}", styles["BodyText"]))
    elements.append(Spacer(1, 12))

    conductas = ai_response.get("conductas", [])
    if conductas:
        elements.append(Paragraph("<b>Conductas identificadas:</b>", styles["BodyText"]))
        for c in conductas:
            elements.append(Paragraph(f"• {c}", styles["BodyText"]))
    elements.append(Spacer(1, 12))

    derechos = ai_response.get("derechos_vulnerados", [])
    if derechos:
        elements.append(Paragraph("<b>Derechos vulnerados:</b>", styles["BodyText"]))
        for d in derechos:
            elements.append(Paragraph(f"• {d}", styles["BodyText"]))
    elements.append(Spacer(1, 12))

    resumen = ai_response.get("resumen_orientacion", "")
    if resumen:
        elements.append(Paragraph(f"<b>Orientación:</b> {resumen}", styles["BodyText"]))
    elements.append(Spacer(1, 20))

    elements.append(Paragraph(
        "<b>Recursos CDMX:</b><br/>Línea Mujeres: 56581111<br/>Emergencias: 911",
        styles["BodyText"]
    ))

    doc.build(elements)
    return pdf_path