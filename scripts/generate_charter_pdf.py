"""Generate the WNSC Final Draft Charter PDF (9 June 2023)."""
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image,
    HRFlowable,
    PageBreak,
    KeepTogether,
)
from reportlab.lib.colors import HexColor

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "wnsc-final-draft-charter-9-june-2023.pdf"
LOGO = ROOT / "public" / "wnsc-logo-press.png"
DIVIDER = ROOT / "public" / "wnsc-water-is-life-divider.png"

NILE = HexColor("#0B6E99")
DARK = HexColor("#0F2A3D")
MUTED = HexColor("#475569")


def styles():
    base = getSampleStyleSheet()
    return {
        "org": ParagraphStyle(
            "Org",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=NILE,
            alignment=TA_CENTER,
            spaceBefore=6,
            spaceAfter=4,
        ),
        "doc_title": ParagraphStyle(
            "DocTitle",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=20,
            textColor=DARK,
            alignment=TA_CENTER,
            spaceAfter=8,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=3,
        ),
        "heading": ParagraphStyle(
            "ArtHeading",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=NILE,
            spaceBefore=12,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13.5,
            textColor=DARK,
            alignment=TA_JUSTIFY,
            spaceAfter=6,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13.5,
            textColor=DARK,
            leftIndent=14,
            spaceAfter=3,
        ),
        "sub": ParagraphStyle(
            "Sub",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13.5,
            textColor=DARK,
            leftIndent=28,
            spaceAfter=2,
        ),
        "sign": ParagraphStyle(
            "Sign",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=DARK,
            alignment=TA_LEFT,
            spaceBefore=8,
            spaceAfter=4,
        ),
        "end": ParagraphStyle(
            "End",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceBefore=16,
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
    }


def art(s, title, *paras):
    blocks = [Paragraph(title, s["heading"])]
    for p in paras:
        if isinstance(p, tuple):
            style_key, text = p
            blocks.append(Paragraph(text, s[style_key]))
        else:
            blocks.append(Paragraph(p, s["body"]))
    return KeepTogether(blocks)


def build():
    s = styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.65 * inch,
        title="WNSC Final Draft Charter — 9 June 2023",
        author="White Nile and Sudd Centre",
    )

    story = []
    if LOGO.exists():
        logo = Image(str(LOGO), width=2.4 * inch, height=0.95 * inch, kind="proportional")
        logo.hAlign = "CENTER"
        story.append(logo)

    story.append(Paragraph("THE WHITE NILE AND SUDD CENTRE (WNSC)", s["org"]))
    story.append(Paragraph("FINAL DRAFT CHARTER", s["doc_title"]))
    story.append(HRFlowable(width="100%", thickness=1.2, color=NILE, spaceBefore=2, spaceAfter=10))
    story.append(Paragraph("<b>9 June 2023</b>", s["meta"]))
    story.append(Paragraph("To: The Plenary of the National Experts, De Havana", s["meta"]))
    story.append(Paragraph("From: The WNSC Registration Committee", s["meta"]))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Preamble", s["heading"]))
    story.append(
        Paragraph(
            "We, a group of National Experts of the Republic of South Sudan desirous and determined:",
            s["body"],
        )
    )
    story.append(
        Paragraph(
            "To advance knowledge, development, management and control, and conservation, of the White Nile Basin, the Sudd, other Wetlands, Associated Waters, including Groundwater, Rainfall Catchments and Watersheds.",
            s["bullet"],
        )
    )
    story.append(
        Paragraph(
            "To cover a broad range of areas and issues relevant to the water resources in all its aspects, including public policy, biodiversity, and geopolitics.",
            s["bullet"],
        )
    )
    story.append(
        Paragraph(
            "Do hereby resolve to accomplish the provisions of the following Charter:",
            s["body"],
        )
    )

    story.append(
        art(
            s,
            "Article 1: Establishment",
            ("bullet", "1.1. This Charter establishes “THE WHITE NILE AND SUDD CENTRE” to be known herewith as the “Centre”."),
            ("bullet", "1.2. The Centre shall be a think tank and shall serve as an institution of excellence in matters related to its area of coverage, functions, and mandate."),
            ("bullet", "1.3. The Centre shall be a juridical body with perpetual succession and shall sue and be sued."),
            ("bullet", "1.4. The Head office of the Centre shall be in Juba."),
        )
    )
    story.append(
        art(
            s,
            "Article 2: Vision",
            "To be the number one public policy think tank in the Republic of South Sudan and beyond that advances efficient, equitable and sustainable management of the White Nile, its tributaries, Sudd wetlands and associated water resources.",
        )
    )
    story.append(
        art(
            s,
            "Article 3: Mission",
            "To conduct research, analysis, awareness, and advocacy to inform and advance public policy on the White Nile, Sudd wetlands, and associated water resources in the Republic of South Sudan and beyond.",
        )
    )
    story.append(
        art(
            s,
            "Article 4: Goals of the Centre",
            ("bullet", "4.1. To promote scientific, technical, and evidence-based public policy making relevant to the White Nile Basin, the Sudd, other Wetlands, and Associated Waters, including Groundwater, and Rainfalls."),
            ("bullet", "4.2. To advocate active participation by the Government in the Nile Basin Initiative and accession to the Cooperative Framework Agreement (CFA)."),
        )
    )
    story.append(
        art(
            s,
            "Article 5: Objectives",
            ("bullet", "5.1. To study, research, analyze and assess, and advocate for the White Nile Basin, the Sudd, other Wetlands, and Associated Water Resources in the Republic of South Sudan."),
            ("bullet", "5.2. To publish and disseminate to the government, academia and the public research findings and advocacy messages."),
        )
    )
    story.append(
        art(
            s,
            "Article 6: Composition of the National Experts",
            "The National Experts forming the Centre shall be drawn from the following categories:",
            ("bullet", "6.1. Independent scholars in the fields related to the function of the Centre regarding the “White Nile, the Sudd, other Wetlands, and Associated Water Resources.”"),
            ("bullet", "6.2. Academicians from South Sudanese universities, institutes, and research centres."),
            ("bullet", "6.3. Public Servants from the Government of the Republic of South Sudan and associated other levels of government."),
            ("bullet", "6.4. Parliamentarians and national figures in the Republic of South Sudan."),
        )
    )
    story.append(
        art(
            s,
            "Article 7: The Structure of the Centre",
            "The structure of the Centre shall be as follows:",
            ("bullet", "7.1. The General Assembly"),
            ("bullet", "7.2. The Board of Trustees"),
            ("bullet", "7.3. The Management Team"),
        )
    )
    story.append(
        art(
            s,
            "Article 8: Composition of the General Assembly",
            "The General Assembly shall be composed of the following:",
            ("bullet", "8.1. The founding members known as the De Havana Group who met regularly prior to registration of the Centre to consider issues relating to the White Nile waters and the Sudd Region."),
            ("bullet", "8.2. Any new members who may wish to join following the registration of the Centre."),
        )
    )
    story.append(
        art(
            s,
            "Article 9: Functions and powers of the General Assembly",
            ("bullet", "9.1. The General Assembly shall be the principal organ of the Centre and shall elect its Chairperson, during a regular session."),
            ("bullet", "9.2. Decisions of the General Assembly shall be concluded by consensus. Failure to achieving consensus, decisions shall be concluded with 50% plus one vote of those members present and voting."),
            ("bullet", "9.3. The General Assembly shall consider and discuss any issue provided for in this charter."),
            ("bullet", "9.4. The General Assembly shall issue directives to the Board of Trustees and the Management Team on any matter within the scope of the Charter."),
            ("bullet", "9.5. The General Assembly shall have the following powers:"),
            ("sub", "a. Elect the Chairperson and members of the Board of Trustees."),
            ("sub", "b. Approve the appointment of the Managing Director by the Board of Trustees."),
            ("sub", "c. Develop Terms of Reference (TOR) for the Chairperson and Members of the Board of Trustees."),
            ("sub", "d. Endorse the strategic plans of the Centre."),
            ("sub", "e. Pass the annual budget of the Centre."),
        )
    )
    story.append(
        art(
            s,
            "Article 10: Meetings of the General Assembly",
            "The General Assembly shall meet in a regular session once a year and in a special session called by the Board of Trustees or by simple majority of the members of the Centre, if necessary and is required, due to urgent matter related to the Centre.",
        )
    )
    story.append(
        art(
            s,
            "Article 11: Composition of the Board of Trustees",
            "The Board of Trustees shall be composed of the following:",
            ("sub", "a. South Sudanese nationals of good character, honor, and integrity."),
            ("sub", "b. Seven (7) members elected by the General Assembly in a regular session."),
            ("sub", "c. The tenure of the members of the Board of Trustees shall be five (5) years, after which new members shall be elected. An existing member shall be re-elected to two (2) tenures only."),
            ("sub", "d. The Chairperson of the Board of Trustees shall be elected by the General Assembly in a regular session, who shall head the Board."),
            ("sub", "e. Decisions of the Board shall be concluded by consensus. Failure to achieving consensus, decisions shall be concluded with 50% plus one vote of those trustees present and voting."),
            ("sub", "f. The Managing Director shall be an ex-officio member of the Board of Trustees and its Secretary."),
        )
    )
    story.append(
        art(
            s,
            "Article 12: The Functions and Objectives of the Board of Trustees",
            "The Board of Trustees is the policy making organ of the Centre and shall oversee the affairs of the Centre in accordance with the provisions of this Charter, and shall have the following functions:",
            ("sub", "a. Formulate and approve comprehensive policies, plans and programmes for scientific, engineering, technological, environmental, legal, political among other research areas and direct implementation to ensure efficiency and effectiveness in utilization, protection of the White Nile Basin systems, the Sudd, other Wetlands, and Associated Water Resources in the Republic of South Sudan."),
            ("sub", "b. Initiate, promote, encourage, and organize scientific research in its various aspects to achieve the vision and mission of the Centre."),
            ("sub", "c. Mobilize resources for research activities and other operations of the Centre."),
            ("sub", "d. Conduct transparent recruitment process and appointment of the Managing Director."),
            ("sub", "e. Approve the appointment of senior members of the Management Team."),
        )
    )
    story.append(
        art(
            s,
            "Article 13: Powers of the Board of Trustees",
            ("bullet", "1. Screen, vet and recommend the Managing Director for appointment by the General Assembly."),
            ("bullet", "2. Oversee the functions and duties of the Managing Director and the Management Team."),
            ("bullet", "3. Approve appointments of other Directors on recommendation of the Managing Director."),
            ("bullet", "4. Discuss and adopt the budget, activities, plans, and programmes, submitted to it by the Managing Director."),
            ("bullet", "5. Provide guidance and advice to the Management Team in the exercise of its duties."),
            ("bullet", "6. Submit annual report to the General Assembly on the work of the Centre in all its manifestations as well as the annual budget."),
        )
    )
    story.append(
        art(
            s,
            "Article 14: Composition of the Management Team",
            ("bullet", "1. The Management Team is the executive organ of the Centre and shall be composed of the following:"),
            ("sub", "a. The Managing Director,"),
            ("sub", "b. The Director of Finance and Administration,"),
            ("sub", "c. The Director of Research,"),
            ("sub", "d. Director of Training,"),
            ("sub", "e. Director of Communications,"),
            ("sub", "f. Two (2) other officers may be assigned by the Managing Director with approval from the Board of Trustees as needs require."),
            ("bullet", "2. The tenure of office of the Managing Director shall be four (4) years, subject to performance, and success in delivering the mandate, vision and mission of the Centre as may be assessed and reviewed by the Board of Trustees and confirmed by the General Assembly."),
            ("bullet", "3. The tenure of office may be subject to renewal for one more term only."),
        )
    )
    story.append(
        art(
            s,
            "Article 15: The Functions and Objectives of the Management Team",
            "Under the leadership of the Managing Director, the Management Team shall implement the activities of the Centre in accordance with the provisions of this Charter, and shall have the following functions:",
            ("sub", "a. Initiate and formulate the policies and decisions of the Centre."),
            ("sub", "b. Prepare and present the budget of the Centre to the Board of Trustees for approval and submission to the General Assembly."),
            ("sub", "c. Submit quarterly progress reports to the Board of Trustees on operations activities of the Centre."),
            ("sub", "d. Exercise such powers, functions and carry out any other duty as shall further the interests of the Centre."),
            ("sub", "e. Initiate, formulate and submit regulations under this Charter to the Board of Trustees for adoption and approval."),
        )
    )
    story.append(
        art(
            s,
            "Article 16: Powers of the Management Team",
            ("bullet", "1. Initiate such creative, innovative, and visionary plans as shall further the work and operations of the Centre."),
            ("bullet", "2. Manage the assets of the Centre and administer its financial and human resources in accordance with the regulations made under this Charter."),
            ("bullet", "3. Give advice and provide consultation to the Government or any of the public institutions, and private sector on any matter concerning the aims and objectives of the Centre."),
            ("bullet", "4. Maintain accurate records of the Centre activities, studies and scientific documentations and publications."),
            ("bullet", "5. Carry out any other duties, exercise powers and perform functions as shall be assigned by the Board of Trustees."),
            ("bullet", "6. Mobilize resources for research activities and other operations of the Centre."),
        )
    )
    story.append(
        art(
            s,
            "Article 17: The Functions of the Managing Director",
            "The Managing Director shall, inter alia, have the following functions:",
            ("sub", "a. Chair the meetings of the Management Team and general meetings."),
            ("sub", "b. Promote the Centre and its activities nationally, regionally, and internationally."),
            ("sub", "c. Ensure the efficient and effective day-to-day running of the Centre."),
            ("sub", "d. Oversee the effective and timely implementation of the policies, activities, programmes coordination and planning of the Centre’s activities."),
            ("sub", "e. Represent the Centre formally in any formal correspondences, dealings, occasions, and engagements with other entities."),
            ("sub", "f. Ensure efficient and cost-effective management of the Centre’s resources."),
            ("sub", "g. Carry out any other duties, exercise powers and perform functions as shall be assigned by the Board of Trustees and the General Assembly."),
            ("sub", "h. Represent and defend the Centre before the courts of law."),
        )
    )
    story.append(
        art(
            s,
            "Article 18: Areas of Strategic Focus",
            "The Centre areas of strategic focus shall be:",
            ("sub", "a. The White Nile River and its tributaries."),
            ("sub", "b. The Sudd, other Wetlands, and the Associated Water Resources."),
            ("sub", "c. The aquifers, rainfall catchments and watersheds."),
            ("sub", "d. Natural resources, environmental sustainability, climate change, and floods/droughts, mitigation, and adaptation."),
            ("sub", "e. Hydrology, Hydraulics, Ecology, Ecosystem, Law, Politics, Economics, Anthropology, Diplomacy, Security, and Infrastructure."),
            ("sub", "f. Sustainable development, local livelihoods, peace, and integration."),
            ("sub", "g. The Nile Basin Initiative (NBI) and Cooperative Framework Agreement (CFA)."),
            ("sub", "h. UNESCO’s Heritage, Ramsar’s Convention, and Ramsar’s Sites."),
            ("sub", "i. Bilateral Memorandum of Understandings and Agreements on Water Resources, Wetlands, and Greenbelts."),
        )
    )
    story.append(
        art(
            s,
            "Article 19: Areas of Operations",
            "The Centre areas of operations shall cover:",
            ("sub", "a. Evidence-based research and writings on the White Nile basin, the Sudd, other Wetlands, and Associated Water Resources, the Greenbelt, and the ecosystems with contained biodiversity of people, livestock, wildlife, fisheries, birds, and vegetation species in the Republic of South Sudan."),
            ("sub", "b. Documentation of information and analyses of the White Nile River, Bhar El Jebel River, Bahr El Ghazal/Naam River, Sobat River, and their tributaries with all the Associated Water Resources and Wetlands in the Republic of South Sudan."),
            ("sub", "c. Scientific studies and research for the generation of evidence-based public policies and programmed actions on restoration, protection, and conservation of the Sudd and other Wetlands of the Republic of South Sudan with the contained fauna and flora."),
            ("sub", "d. Feasibility Studies (FS) and Environmental and Social Impact Assessments (ESIA) on major developmental and infrastructural construction projects that have implications for water resources and wetlands of the Republic of South Sudan."),
            ("sub", "e. Work in partnership with the Institute of Water Studies (IWS) of the University of Juba, the Berberi Academy for Training and Learning, The Sudd Institute, and any other relevant institutions and think-tanks in the Republic of South Sudan and abroad."),
            ("sub", "f. Networking, lobbying and advocacy on water resources, wetlands, and greenbelts of the Republic of South Sudan."),
        )
    )
    story.append(
        art(
            s,
            "Article 20: Activities of the Centre",
            "The main activities to achieve by the operations of the Centre, include but not limited to:",
            ("sub", "a. Research, analysis, and assessment."),
            ("sub", "b. Documentation and Publication."),
            ("sub", "c. Advocacy and lobbying."),
            ("sub", "d. Conferences."),
            ("sub", "e. Seminars and workshops."),
            ("sub", "f. Public lectures."),
            ("sub", "g. Training and capacity development."),
        )
    )
    story.append(
        art(
            s,
            "Article 21: Ethics and Confidentiality",
            ("bullet", "1. All research, studies, fact-based analyses made by the researchers of the Centre while carrying out their duties or in connection with their performance shall be the property of the Centre and shall not be published or reproduced without written consent of the Managing Director of the Centre according to international copyright laws and national legal standards."),
            ("bullet", "2. Any member of the Board of Trustees and Management Team of the Centre or an employee of the Centre shall not divulge any confidential information acquired during his or her duty."),
        )
    )
    story.append(
        art(
            s,
            "Article 22: Protection of Records and Assets",
            "The employees of the Centre shall protect the properties, records, and assets of the Centre from any misuse, loss, or damage.",
        )
    )
    story.append(
        art(
            s,
            "Article 23: Cadre Capacity Development",
            "The Management Team of the Centre shall provide its members, and the Board of Trustees, as is deemed necessary the required capacity development on:",
            ("sub", "a. Provisions and development of water resources knowledge and scientific skills."),
            ("sub", "b. Institutional support, technical assistance, information management and technological know-how facilitated by efficient tools and equipment."),
            ("sub", "c. Job opportunities and career development path."),
        )
    )
    story.append(
        art(
            s,
            "Article 24: Funding",
            ("bullet", "1. The Centre’s sources of funding are:"),
            ("sub", "a. Contributions of its members, donations, and grants."),
            ("sub", "b. Private donations from like-minded organizations, tertiary institutions, and businesses."),
            ("sub", "c. Grants from friends and partners of the Centre, public institutions, businesses, and international NGOs and Developmental partners."),
            ("sub", "d. Public funds."),
            ("bullet", "2. The Centre shall comply with the financial management regulations with regards to:"),
            ("sub", "a. Keeping of accounting records."),
            ("sub", "b. Preparation of annual final accounts statements."),
            ("sub", "c. Having an independent budget."),
            ("sub", "d. Preparing annual budget."),
            ("sub", "e. Conduct of annual auditing of the accounts through internal or external auditing firms."),
            ("sub", "f. Opening and proper management of all accounts."),
            ("sub", "g. Issuing cheques and other financial instruments, and operating bank accounts in the name of the Centre."),
            ("bullet", "3. The Centre shall publish its annual financial report including financial balance sheet annually not exceeding by 31 January every year."),
        )
    )
    story.append(
        art(
            s,
            "Article 25: Monitoring and Evaluation",
            "Monitoring and Evaluation of the Centre’s operations shall be carried out through the Centre’s Performance Management system, and by the Board of Trustees as well as by internal and external auditing.",
        )
    )
    story.append(
        art(
            s,
            "Article 26: Loss of membership",
            "A member to the Centre shall cease to be a member if:",
            ("sub", "a. He or she dies."),
            ("sub", "b. He or she is convicted of criminal act of dishonesty or moral turpitude."),
            ("sub", "c. He or she becomes incapable because of mental disorder, serious illness, or serious injury."),
            ("sub", "d. Absent without notice for 5 consecutive meetings without any convincing reason, or notice, and"),
            ("sub", "e. In the opinion of the Board of Trustees it appears that the member in question is acting in a manner detrimental or prejudicial to the mandate and/or wellbeing of the Centre."),
        )
    )
    story.append(
        art(
            s,
            "Article 27: General Provisions",
            "Subject to the provisions of this Charter:",
            ("sub", "a. The Management Team shall draft such regulations as may be deemed necessary or convenient for the proper conduct of the affairs of the Centre."),
            ("sub", "b. Ensure adherence to the quality, standards of research, ethics, priorities, regulations, and protocol for research as required under the South Sudan Research Council Act, 2007."),
        )
    )
    story.append(
        art(
            s,
            "Article 28: Entry into force and amendment",
            ("bullet", "1. (This Charter shall be registered under the South Sudan Non-Governmental Organization Act, 2016.)"),
            ("bullet", "2. This Centre shall be registered as a think tank upon registration in accordance with the prevailing law in the Republic of South Sudan."),
            ("bullet", "3. This Charter shall enter into force upon registration."),
            ("bullet", "4. An amendment to this charter may be initiated by a two-thirds majority of the Board of Trustees."),
        )
    )

    story.append(Spacer(1, 20))
    story.append(Paragraph("Signed: ___________________", s["sign"]))
    story.append(Paragraph("<b>Honorable Joshua Dau Diu</b>,", s["sign"]))
    story.append(Paragraph("Chairperson, Board of Trustees.", s["sign"]))
    story.append(Paragraph("— End of Text —", s["end"]))

    if DIVIDER.exists():
        story.append(Spacer(1, 12))
        divider = Image(str(DIVIDER), width=4.0 * inch, height=0.26 * inch, kind="proportional")
        divider.hAlign = "CENTER"
        story.append(divider)

    story.append(Spacer(1, 8))
    story.append(
        Paragraph(
            "Tel: +211 914 789 322  |  E-mail: whitenilesuddcenter@gmail.com  |  info@wnscss.org",
            s["footer"],
        )
    )

    doc.build(story)
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    build()
