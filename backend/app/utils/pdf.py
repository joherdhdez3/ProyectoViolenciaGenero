from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus import Paragraph
from reportlab.platypus import Spacer

from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf(user_message: str, ai_response: str):

    pdf_path = "reporte.pdf"

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    elements = []

    title = Paragraph(
        "Reporte de Orientación",
        styles["Title"]
    )

    elements.append(title)

    elements.append(Spacer(1, 20))

    user_text = Paragraph(
        f"<b>Mensaje usuario:</b> {user_message}",
        styles["BodyText"]
    )

    elements.append(user_text)

    elements.append(Spacer(1, 20))

    response_text = Paragraph(
        f"<b>Respuesta IA:</b> {ai_response}",
        styles["BodyText"]
    )

    elements.append(response_text)

    elements.append(Spacer(1, 20))

    resources = Paragraph(
        """
        <b>Recursos CDMX:</b><br/>
        Línea Mujeres: 56581111<br/>
        Emergencias: 911
        """,
        styles["BodyText"]
    )

    elements.append(resources)

    doc.build(elements)

    return pdf_path