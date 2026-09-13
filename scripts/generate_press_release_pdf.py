"""Generate the Sudd Wetland Hybrid Global Conference press release PDF."""
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch, mm
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image,
    HRFlowable,
    KeepTogether,
)
from reportlab.lib.colors import HexColor, white

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "press-release-sudd-wetland-conference-may-2026.pdf"
LOGO = ROOT / "public" / "wnsc-logo-press.png"
DIVIDER = ROOT / "public" / "wnsc-water-is-life-divider.png"

NILE = HexColor("#0B6E99")
DARK = HexColor("#0F2A3D")
MUTED = HexColor("#475569")


def build():
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=0.85 * inch,
        rightMargin=0.85 * inch,
        topMargin=0.6 * inch,
        bottomMargin=0.7 * inch,
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "PressTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=19,
        textColor=DARK,
        alignment=TA_CENTER,
        spaceAfter=6,
    )
    org_style = ParagraphStyle(
        "Org",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=14,
        textColor=NILE,
        alignment=TA_CENTER,
        spaceAfter=4,
        spaceBefore=8,
    )
    dateline = ParagraphStyle(
        "Dateline",
        parent=styles["Normal"],
        fontName="Helvetica-Oblique",
        fontSize=10,
        leading=14,
        textColor=MUTED,
        alignment=TA_LEFT,
        spaceBefore=14,
        spaceAfter=12,
    )
    body = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=16,
        textColor=DARK,
        alignment=TA_JUSTIFY,
        spaceAfter=11,
    )
    end_style = ParagraphStyle(
        "End",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceBefore=8,
        spaceAfter=16,
    )
    footer = ParagraphStyle(
        "Footer",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=13,
        textColor=MUTED,
        alignment=TA_CENTER,
    )

    story = []

    if LOGO.exists():
        logo = Image(str(LOGO), width=2.6 * inch, height=1.05 * inch, kind="proportional")
        logo.hAlign = "CENTER"
        story.append(logo)

    story.append(Paragraph("THE WHITE NILE AND SUDD CENTRE", org_style))
    story.append(
        HRFlowable(
            width="100%", thickness=1.2, color=NILE, spaceBefore=4, spaceAfter=14
        )
    )
    story.append(
        Paragraph(
            "Press Release on Conclusion of the Sudd Wetland Hybrid Global Conference",
            title_style,
        )
    )
    story.append(
        Paragraph(
            "<b>May 2, 2026 — Juba</b> — In a collaborative initiative, the White Nile and Sudd Centre (WNSC) and Wake Forest University held a hybrid global conference on the impacts of climate change on the Sudd Wetland in South Sudan.",
            dateline,
        )
    )

    paragraphs = [
        "The WNSC is a premier think tank organization based in Juba, South Sudan, which engages in evidence-based research on environmental related subjects and climate change risk mitigation to safeguard the communities and their animals that are vulnerable to climate shocks. On the other hand, Wake Forest University is a private research university that is located in Winston-Salem, North Carolina in the United States of America. Through its Sabin Center for Environment and Sustainability, the university collaborated with White Nile and Sudd Centre in hosting a hybrid global conference on the implications of climate change on the Sudd Wetlands.",
        "The most important highlight of the conference is that it brought together local representatives from the counties most affected by floods in the Sudd Wetland, multidisciplinary experts from South Sudan, USA, and Nairobi, and South Sudan government officials as participants.",
        "The Sudd Wetland is the largest tropical freshwater ecosystem in Africa and is located in South Sudan. The Sudd Wetland is significant to South Sudan because it maintains livelihoods among the communities, serves as a vital habitat for biodiversity, captures carbon, and acts as a “sponge” to store and slowly release rainfall and heavy river flows in the region.",
        "Therefore, the partnership between WNSC and Wake Forest University is deepening in an effort to address critical climate challenges affecting the Sudd Wetland ecosystem.",
    ]
    for p in paragraphs:
        story.append(Paragraph(p, body))

    story.append(Paragraph("— End —", end_style))

    if DIVIDER.exists():
        divider = Image(str(DIVIDER), width=4.2 * inch, height=0.28 * inch, kind="proportional")
        divider.hAlign = "CENTER"
        story.append(divider)
        story.append(Spacer(1, 10))

    story.append(
        Paragraph(
            "Tel: +211 914 789 322 &nbsp;|&nbsp; E-mail: whitenilesuddcenter@gmail.com",
            footer,
        )
    )

    doc.build(story)
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    build()
