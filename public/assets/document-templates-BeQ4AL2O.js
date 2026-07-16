const t=[{id:"letter-formal-business",builderId:"letter",name:"Formal Business Letter",description:"Standard UK formal business letter for any professional purpose",category:"Business",planRequired:"free",status:"active",popular:!0,supportsBranding:!1,defaultLayout:"classic-letter",accentColor:"#111111",fields:[{id:"sender_name",label:"Your Name",type:"text",required:!0,placeholder:"e.g. John Smith"},{id:"sender_organisation",label:"Your Organisation",type:"text",placeholder:"e.g. Smith & Co Ltd"},{id:"sender_address",label:"Your Address",type:"textarea",placeholder:`12 Example Road
London
N1 1AA`},{id:"sender_email",label:"Your Email",type:"email",placeholder:"john@example.com"},{id:"sender_phone",label:"Your Phone",type:"phone",placeholder:"07123 456789"},{id:"sender_website",label:"Your Website",type:"text",placeholder:"www.example.com"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",required:!0,placeholder:"e.g. Housing Repairs Team"},{id:"recipient_title",label:"Recipient Title / Role",type:"text",placeholder:"e.g. Customer Services Manager"},{id:"recipient_organisation",label:"Recipient Organisation",type:"text",placeholder:"e.g. Example Council"},{id:"recipient_address",label:"Recipient Address",type:"textarea",placeholder:`Council Offices
High Street
London
N1 2BB`},{id:"reference",label:"Reference (optional)",type:"text",placeholder:"e.g. REP-2026-001"},{id:"subject",label:"Subject",type:"text",required:!0,placeholder:"e.g. Request for urgent repair"},{id:"salutation",label:"Salutation",type:"text",defaultValue:"Dear",required:!0},{id:"body",label:"Letter Body",type:"textarea",required:!0,placeholder:"Write your letter here..."},{id:"closing",label:"Closing",type:"text",defaultValue:"Yours sincerely,"},{id:"signatory_name",label:"Signatory Name",type:"text",placeholder:"e.g. John Smith"},{id:"signatory_title",label:"Signatory Title",type:"text",placeholder:"e.g. Director"}],bodyTemplate:"{{body}}"},{id:"letter-classic-uk",builderId:"letter",name:"Classic UK Formal Letter",description:"Traditional UK letter layout — clean, plain, professional. No coloured header.",category:"Business",planRequired:"free",status:"active",popular:!0,supportsBranding:!1,defaultLayout:"classic-letter",accentColor:"#111111",fields:[{id:"sender_name",label:"Your Name",type:"text",required:!0,placeholder:"e.g. John Smith"},{id:"sender_organisation",label:"Your Organisation",type:"text",placeholder:"e.g. Smith & Co Ltd"},{id:"sender_address",label:"Your Address",type:"textarea",placeholder:`12 Example Road
London
N1 1AA`},{id:"sender_email",label:"Your Email",type:"email"},{id:"sender_phone",label:"Your Phone",type:"phone"},{id:"sender_website",label:"Your Website",type:"text"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",required:!0},{id:"recipient_title",label:"Recipient Title / Role",type:"text"},{id:"recipient_organisation",label:"Recipient Organisation",type:"text"},{id:"recipient_address",label:"Recipient Address",type:"textarea"},{id:"reference",label:"Reference (optional)",type:"text"},{id:"subject",label:"Subject",type:"text",required:!0},{id:"salutation",label:"Salutation",type:"text",defaultValue:"Dear",required:!0},{id:"body",label:"Letter Body",type:"textarea",required:!0},{id:"closing",label:"Closing",type:"text",defaultValue:"Yours sincerely,"},{id:"signatory_name",label:"Signatory Name",type:"text"},{id:"signatory_title",label:"Signatory Title",type:"text"}],bodyTemplate:"{{body}}"},{id:"letter-minimal-plain",builderId:"letter",name:"Minimal Plain Letter",description:"Plain black text, no colours or logo. Suitable for legal, council, GP, bank, solicitor and government letters.",category:"Business",planRequired:"free",status:"active",popular:!1,supportsBranding:!1,defaultLayout:"minimal-letter",accentColor:"#111111",fields:[{id:"sender_name",label:"Your Name",type:"text",required:!0},{id:"sender_organisation",label:"Your Organisation",type:"text"},{id:"sender_address",label:"Your Address",type:"textarea"},{id:"sender_email",label:"Your Email",type:"email"},{id:"sender_phone",label:"Your Phone",type:"phone"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",required:!0},{id:"recipient_title",label:"Recipient Title / Role",type:"text"},{id:"recipient_organisation",label:"Recipient Organisation",type:"text"},{id:"recipient_address",label:"Recipient Address",type:"textarea"},{id:"reference",label:"Reference (optional)",type:"text"},{id:"subject",label:"Subject",type:"text",required:!0},{id:"salutation",label:"Salutation",type:"text",defaultValue:"Dear",required:!0},{id:"body",label:"Letter Body",type:"textarea",required:!0},{id:"closing",label:"Closing",type:"text",defaultValue:"Yours faithfully,"},{id:"signatory_name",label:"Signatory Name",type:"text"},{id:"signatory_title",label:"Signatory Title",type:"text"}],bodyTemplate:"{{body}}"},{id:"letter-organisation",builderId:"letter",name:"Organisation Letter",description:"Optional logo, organisation header, footer, company number and registered address. All branding is user-controlled.",category:"Business",planRequired:"personal",status:"active",popular:!1,supportsBranding:!0,defaultLayout:"org-letter",accentColor:"#1B4F8A",fields:[{id:"header_text",label:"Organisation Name (header)",type:"text",placeholder:"Shown in the document header"},{id:"sender_name",label:"Sender Name",type:"text",required:!0},{id:"sender_organisation",label:"Sender Organisation",type:"text"},{id:"sender_address",label:"Sender Address",type:"textarea"},{id:"sender_email",label:"Sender Email",type:"email"},{id:"sender_phone",label:"Sender Phone",type:"phone"},{id:"sender_website",label:"Sender Website",type:"text"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",required:!0},{id:"recipient_title",label:"Recipient Title / Role",type:"text"},{id:"recipient_organisation",label:"Recipient Organisation",type:"text"},{id:"recipient_address",label:"Recipient Address",type:"textarea"},{id:"reference",label:"Reference (optional)",type:"text"},{id:"subject",label:"Subject",type:"text",required:!0},{id:"salutation",label:"Salutation",type:"text",defaultValue:"Dear",required:!0},{id:"body",label:"Letter Body",type:"textarea",required:!0},{id:"closing",label:"Closing",type:"text",defaultValue:"Yours sincerely,"},{id:"signatory_name",label:"Signatory Name",type:"text"},{id:"signatory_title",label:"Signatory Title",type:"text"},{id:"footer_text",label:"Footer Text (optional)",type:"text",placeholder:"e.g. Registered in England and Wales"},{id:"company_number",label:"Company Number (optional)",type:"text",placeholder:"e.g. 12345678"},{id:"registered_address",label:"Registered Address (optional)",type:"textarea",placeholder:"Registered office address"},{id:"disclaimer",label:"Disclaimer (optional)",type:"textarea",placeholder:"e.g. This letter is confidential..."}],bodyTemplate:"{{body}}"},{id:"letter-business-inquiry",builderId:"letter",name:"Business Enquiry Letter",description:"Enquire about products, services, or business opportunities",category:"Business",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"sender_name",label:"Your Name / Organisation",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea"},{id:"sender_email",label:"Your Email",type:"email"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",required:!0},{id:"recipient_org",label:"Recipient Organisation",type:"text"},{id:"recipient_address",label:"Recipient Address",type:"textarea"},{id:"subject",label:"Subject",type:"text",defaultValue:"Business Enquiry",required:!0},{id:"enquiry_details",label:"Enquiry Details",type:"textarea",required:!0,placeholder:"Describe what you are enquiring about"},{id:"specific_questions",label:"Specific Questions",type:"textarea",placeholder:"List any specific questions you have"},{id:"next_steps",label:"Requested Next Steps",type:"textarea",placeholder:"e.g. Please send a brochure / arrange a call"},{id:"signatory_name",label:"Your Name",type:"text"}],bodyTemplate:`{{sender_name}}
{{sender_address}}
{{sender_email}}

{{letter_date}}

{{recipient_name}}
{{recipient_org}}
{{recipient_address}}

**{{subject}}**

Dear {{recipient_name}},

I am writing to enquire about the following:

{{enquiry_details}}

{{specific_questions}}

{{next_steps}}

I look forward to hearing from you.

Yours sincerely,

{{signatory_name}}`},{id:"letter-reference",builderId:"letter",name:"Reference Letter",description:"Professional reference or character reference letter",category:"Business",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"sender_name",label:"Your Name",type:"text",required:!0},{id:"sender_title",label:"Your Title / Role",type:"text"},{id:"sender_org",label:"Your Organisation",type:"text"},{id:"sender_email",label:"Your Email",type:"email"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"subject_name",label:"Subject's Full Name",type:"text",required:!0},{id:"relationship",label:"Your Relationship",type:"text",placeholder:"e.g. Line Manager, Colleague, Tutor",required:!0},{id:"duration",label:"Duration Known",type:"text",placeholder:"e.g. 3 years"},{id:"qualities",label:"Key Qualities & Strengths",type:"textarea",required:!0},{id:"achievements",label:"Notable Achievements",type:"textarea"},{id:"recommendation",label:"Recommendation Statement",type:"textarea",required:!0},{id:"contact_offer",label:"Contact Offer",type:"text",defaultValue:"Please do not hesitate to contact me if you require any further information."}],bodyTemplate:`{{sender_name}}
{{sender_title}}, {{sender_org}}
{{sender_email}}

{{letter_date}}

To Whom It May Concern,

**Re: Reference for {{subject_name}}**

I am pleased to provide this reference for {{subject_name}}, whom I have known as {{relationship}} for {{duration}}.

{{qualities}}

{{achievements}}

{{recommendation}}

{{contact_offer}}

Yours faithfully,

{{sender_name}}
{{sender_title}}
{{sender_org}}`},{id:"letter-complaint-formal",builderId:"letter",name:"Complaint Letter",description:"Formal complaint with strong reference/subject block. Suitable for complaints, disputes, housing, service issues.",category:"Complaints",planRequired:"free",status:"active",popular:!0,supportsBranding:!1,defaultLayout:"complaint-letter",accentColor:"#111111",fields:[{id:"sender_name",label:"Your Full Name",type:"text",required:!0},{id:"sender_organisation",label:"Your Organisation",type:"text"},{id:"sender_address",label:"Your Address",type:"textarea",required:!0},{id:"sender_email",label:"Your Email",type:"email"},{id:"sender_phone",label:"Your Phone",type:"phone"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Recipient Name / Department",type:"text",defaultValue:"The Complaints Manager"},{id:"recipient_title",label:"Recipient Title",type:"text"},{id:"recipient_organisation",label:"Organisation Name",type:"text",required:!0},{id:"recipient_address",label:"Organisation Address",type:"textarea"},{id:"reference",label:"Reference / Account Number",type:"text"},{id:"subject",label:"Complaint Subject",type:"text",required:!0,placeholder:"e.g. Failure to carry out repairs"},{id:"salutation",label:"Salutation",type:"text",defaultValue:"Dear",required:!0},{id:"body",label:"Complaint Details",type:"textarea",required:!0,placeholder:"Describe your complaint in full..."},{id:"closing",label:"Closing",type:"text",defaultValue:"Yours faithfully,"},{id:"signatory_name",label:"Your Name",type:"text"},{id:"signatory_title",label:"Your Title",type:"text"}],bodyTemplate:"{{body}}"},{id:"letter-complaint",builderId:"letter",name:"Formal Complaint Letter",description:"Formal complaint to a business, organisation, or service provider",category:"Complaints",planRequired:"personal",status:"active",supportsBranding:!1,accentColor:"#dc2626",fields:[{id:"sender_name",label:"Your Full Name",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea",required:!0},{id:"sender_email",label:"Your Email",type:"email"},{id:"sender_phone",label:"Your Phone",type:"phone"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Complaints Manager / Name",type:"text",defaultValue:"The Complaints Manager"},{id:"recipient_org",label:"Organisation Name",type:"text",required:!0},{id:"recipient_address",label:"Organisation Address",type:"textarea"},{id:"account_ref",label:"Account / Reference Number",type:"text"},{id:"complaint_subject",label:"Complaint Subject",type:"text",required:!0},{id:"incident_date",label:"Date of Incident",type:"date"},{id:"complaint_details",label:"Full Details of Complaint",type:"textarea",required:!0},{id:"previous_contact",label:"Previous Contact / Attempts",type:"textarea",placeholder:"Describe any previous attempts to resolve this"},{id:"resolution_sought",label:"Resolution Sought",type:"textarea",required:!0,placeholder:"What outcome are you seeking?"},{id:"deadline",label:"Response Deadline",type:"text",defaultValue:"14 days"}],bodyTemplate:`{{sender_name}}
{{sender_address}}
{{sender_email}}
{{sender_phone}}

{{letter_date}}

{{recipient_name}}
{{recipient_org}}
{{recipient_address}}

**FORMAL COMPLAINT: {{complaint_subject}}**
Account / Reference: {{account_ref}}

Dear {{recipient_name}},

I am writing to formally complain about {{complaint_subject}}, which occurred on {{incident_date}}.

**Details of my complaint:**

{{complaint_details}}

**Previous contact:**

{{previous_contact}}

**Resolution sought:**

{{resolution_sought}}

I expect a full written response within **{{deadline}}** of the date of this letter. If I do not receive a satisfactory response, I reserve the right to escalate this matter to the relevant ombudsman or regulatory body.

Yours faithfully,

{{sender_name}}`},{id:"letter-complaint-response",builderId:"letter",name:"Complaint Response Letter",description:"Respond to a customer or client complaint professionally",category:"Complaints",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#dc2626",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"sender_name",label:"Responder Name",type:"text",required:!0},{id:"sender_title",label:"Responder Title",type:"text"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Complainant Name",type:"text",required:!0},{id:"recipient_address",label:"Complainant Address",type:"textarea"},{id:"complaint_ref",label:"Complaint Reference",type:"text"},{id:"complaint_summary",label:"Summary of Complaint",type:"textarea",required:!0},{id:"investigation",label:"Investigation Findings",type:"textarea",required:!0},{id:"outcome",label:"Outcome / Decision",type:"select",options:["Complaint upheld","Complaint partially upheld","Complaint not upheld"],defaultValue:"Complaint upheld"},{id:"remedy",label:"Remedy / Action Taken",type:"textarea",required:!0},{id:"apology",label:"Apology Statement",type:"textarea",defaultValue:"We sincerely apologise for the inconvenience and distress this matter has caused."},{id:"escalation_info",label:"Escalation Rights",type:"textarea",defaultValue:"If you remain dissatisfied with our response, you have the right to escalate this matter to the relevant ombudsman or regulatory body."}],bodyTemplate:`{{org_name}}

{{letter_date}}

{{recipient_name}}
{{recipient_address}}

**Re: Your Complaint — Ref: {{complaint_ref}}**

Dear {{recipient_name}},

Thank you for bringing your complaint to our attention. We have now completed our investigation and write to provide our formal response.

**Summary of your complaint:**
{{complaint_summary}}

**Our investigation:**
{{investigation}}

**Outcome: {{outcome}}**

**Action taken:**
{{remedy}}

{{apology}}

{{escalation_info}}

Yours sincerely,

{{sender_name}}
{{sender_title}}
{{org_name}}`},{id:"letter-offer-employment",builderId:"letter",name:"Job Offer Letter",description:"Formal offer of employment letter",category:"HR & Employment",planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"candidate_name",label:"Candidate Full Name",type:"text",required:!0},{id:"candidate_address",label:"Candidate Address",type:"textarea"},{id:"job_title",label:"Job Title",type:"text",required:!0},{id:"department",label:"Department",type:"text"},{id:"start_date",label:"Start Date",type:"date",required:!0},{id:"salary",label:"Salary",type:"text",required:!0,placeholder:"e.g. £35,000 per annum"},{id:"hours",label:"Hours of Work",type:"text",defaultValue:"37.5 hours per week, Monday to Friday"},{id:"probation",label:"Probation Period",type:"text",defaultValue:"3 months"},{id:"holiday",label:"Annual Leave",type:"text",defaultValue:"25 days plus bank holidays"},{id:"conditions",label:"Conditions of Offer",type:"textarea",defaultValue:"This offer is subject to satisfactory references and right to work verification."},{id:"acceptance_deadline",label:"Acceptance Deadline",type:"date"},{id:"hr_contact",label:"HR Contact Name",type:"text"},{id:"hr_email",label:"HR Email",type:"email"}],bodyTemplate:`{{org_name}}

{{letter_date}}

{{candidate_name}}
{{candidate_address}}

**OFFER OF EMPLOYMENT**

Dear {{candidate_name}},

We are delighted to offer you the position of **{{job_title}}** within the {{department}} department at {{org_name}}.

**Terms of your offer:**

- **Start Date:** {{start_date}}
- **Salary:** {{salary}}
- **Hours:** {{hours}}
- **Probation Period:** {{probation}}
- **Annual Leave:** {{holiday}}

**Conditions:**
{{conditions}}

Please confirm your acceptance of this offer in writing by {{acceptance_deadline}}.

If you have any questions, please contact {{hr_contact}} at {{hr_email}}.

We look forward to welcoming you to the team.

Yours sincerely,

{{hr_contact}}
HR Department
{{org_name}}`},{id:"letter-resignation",builderId:"letter",name:"Resignation Letter",description:"Professional resignation letter with notice period",category:"HR & Employment",planRequired:"personal",status:"active",supportsBranding:!1,accentColor:"#7c3aed",fields:[{id:"sender_name",label:"Your Full Name",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"manager_name",label:"Manager's Name",type:"text",required:!0},{id:"manager_title",label:"Manager's Title",type:"text"},{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"job_title",label:"Your Job Title",type:"text",required:!0},{id:"notice_period",label:"Notice Period",type:"text",defaultValue:"one month",required:!0},{id:"last_day",label:"Last Working Day",type:"date",required:!0},{id:"reason",label:"Reason (optional)",type:"textarea",placeholder:"Brief reason for leaving — keep positive"},{id:"gratitude",label:"Gratitude Statement",type:"textarea",defaultValue:"I am grateful for the opportunities and experiences I have gained during my time here."},{id:"handover_offer",label:"Handover Offer",type:"text",defaultValue:"I am happy to assist with the handover of my responsibilities during my notice period."}],bodyTemplate:`{{sender_name}}
{{sender_address}}

{{letter_date}}

{{manager_name}}
{{manager_title}}
{{org_name}}

Dear {{manager_name}},

**Resignation — {{job_title}}**

I am writing to formally resign from my position as {{job_title}} at {{org_name}}, with effect from {{letter_date}}.

In accordance with my notice period of {{notice_period}}, my last working day will be **{{last_day}}**.

{{reason}}

{{gratitude}}

{{handover_offer}}

Yours sincerely,

{{sender_name}}`},{id:"letter-disciplinary",builderId:"letter",name:"Disciplinary Letter",description:"Formal disciplinary letter — warning or outcome notice",category:"HR & Employment",planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"employee_name",label:"Employee Full Name",type:"text",required:!0},{id:"employee_address",label:"Employee Address",type:"textarea"},{id:"job_title",label:"Job Title",type:"text",required:!0},{id:"warning_type",label:"Warning Type",type:"select",options:["First Written Warning","Final Written Warning","Dismissal Notice","Suspension Notice"],defaultValue:"First Written Warning"},{id:"misconduct_details",label:"Details of Misconduct",type:"textarea",required:!0},{id:"hearing_date",label:"Date of Disciplinary Hearing",type:"date"},{id:"outcome",label:"Outcome / Decision",type:"textarea",required:!0},{id:"improvement_required",label:"Improvement Required",type:"textarea"},{id:"warning_duration",label:"Warning Duration",type:"text",defaultValue:"12 months"},{id:"appeal_rights",label:"Appeal Rights",type:"textarea",defaultValue:"You have the right to appeal this decision within 5 working days by writing to the HR Manager."},{id:"hr_name",label:"HR / Manager Name",type:"text"}],bodyTemplate:`{{org_name}}

{{letter_date}}

PRIVATE AND CONFIDENTIAL

{{employee_name}}
{{employee_address}}

Dear {{employee_name}},

**{{warning_type}} — {{job_title}}**

Following the disciplinary hearing held on {{hearing_date}}, I am writing to confirm the outcome of the disciplinary process.

**Details of the matter:**
{{misconduct_details}}

**Outcome:**
{{outcome}}

**Improvement required:**
{{improvement_required}}

This {{warning_type}} will remain on your personnel file for **{{warning_duration}}**.

**Your right to appeal:**
{{appeal_rights}}

Yours sincerely,

{{hr_name}}
{{org_name}}`},{id:"letter-tenancy-notice",builderId:"letter",name:"Tenancy Notice Letter",description:"Section 21 or Section 8 notice, or notice to quit",category:"Property",planRequired:"standard",status:"active",supportsBranding:!1,accentColor:"#b45309",fields:[{id:"landlord_name",label:"Landlord / Agent Name",type:"text",required:!0},{id:"landlord_address",label:"Landlord Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"tenant_name",label:"Tenant(s) Full Name(s)",type:"text",required:!0},{id:"property_address",label:"Property Address",type:"textarea",required:!0},{id:"notice_type",label:"Notice Type",type:"select",options:["Section 21 Notice","Section 8 Notice","Notice to Quit","Notice of Rent Increase","Notice of Inspection"],defaultValue:"Section 21 Notice"},{id:"notice_details",label:"Notice Details",type:"textarea",required:!0},{id:"vacate_date",label:"Date to Vacate / Comply",type:"date"},{id:"legal_note",label:"Legal Note",type:"textarea",defaultValue:"This notice is served in accordance with the Housing Act 1988 (as amended). You may wish to seek independent legal advice."}],bodyTemplate:`{{landlord_name}}
{{landlord_address}}

{{letter_date}}

{{tenant_name}}
{{property_address}}

**{{notice_type}}**

Dear {{tenant_name}},

I am writing regarding the tenancy at the above property.

{{notice_details}}

**Date to vacate / comply: {{vacate_date}}**

{{legal_note}}

Yours faithfully,

{{landlord_name}}`},{id:"letter-cover",builderId:"letter",name:"Cover Letter",description:"Job application cover letter",category:"Cover Letters",planRequired:"personal",status:"active",supportsBranding:!1,accentColor:"#0891b2",fields:[{id:"sender_name",label:"Your Full Name",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea"},{id:"sender_email",label:"Your Email",type:"email",required:!0},{id:"sender_phone",label:"Your Phone",type:"phone"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"hiring_manager",label:"Hiring Manager Name",type:"text",defaultValue:"Hiring Manager"},{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"org_address",label:"Organisation Address",type:"textarea"},{id:"job_title",label:"Job Title Applying For",type:"text",required:!0},{id:"job_ref",label:"Job Reference (if any)",type:"text"},{id:"opening",label:"Opening Paragraph",type:"textarea",required:!0,placeholder:"Why you are applying and where you saw the role"},{id:"skills_experience",label:"Skills & Experience",type:"textarea",required:!0,placeholder:"Key skills and experience relevant to the role"},{id:"why_company",label:"Why This Organisation",type:"textarea",required:!0,placeholder:"Why you want to work for this specific organisation"},{id:"closing_statement",label:"Closing Statement",type:"textarea",defaultValue:"I would welcome the opportunity to discuss my application further and am available for interview at your convenience."}],bodyTemplate:`{{sender_name}}
{{sender_address}}
{{sender_email}} | {{sender_phone}}

{{letter_date}}

{{hiring_manager}}
{{org_name}}
{{org_address}}

Dear {{hiring_manager}},

**Application for: {{job_title}}{{job_ref}}**

{{opening}}

{{skills_experience}}

{{why_company}}

{{closing_statement}}

Yours sincerely,

{{sender_name}}`},{id:"letter-school-absence",builderId:"letter",name:"School Absence Letter",description:"Letter to school explaining a child's absence",category:"School & Education",planRequired:"personal",status:"active",supportsBranding:!1,accentColor:"#16a34a",fields:[{id:"parent_name",label:"Parent / Guardian Name",type:"text",required:!0},{id:"parent_address",label:"Your Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"teacher_name",label:"Teacher / Head Teacher",type:"text",defaultValue:"The Class Teacher"},{id:"school_name",label:"School Name",type:"text",required:!0},{id:"child_name",label:"Child's Full Name",type:"text",required:!0},{id:"child_class",label:"Child's Class / Year",type:"text"},{id:"absence_dates",label:"Dates of Absence",type:"text",required:!0},{id:"reason",label:"Reason for Absence",type:"textarea",required:!0},{id:"return_date",label:"Expected Return Date",type:"date"}],bodyTemplate:`{{parent_name}}
{{parent_address}}

{{letter_date}}

{{teacher_name}}
{{school_name}}

Dear {{teacher_name}},

**Re: Absence of {{child_name}}, {{child_class}}**

I am writing to inform you that {{child_name}} was/will be absent from school on {{absence_dates}}.

**Reason for absence:**
{{reason}}

{{child_name}} is expected to return to school on {{return_date}}.

Please do not hesitate to contact me if you require any further information.

Yours sincerely,

{{parent_name}}`},{id:"letter-fundraising",builderId:"letter",name:"Fundraising Appeal Letter",description:"Charity fundraising appeal or donation request letter",category:"Charity & Voluntary",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"charity_name",label:"Charity / Organisation Name",type:"text",required:!0},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"Dear Friend"},{id:"cause_description",label:"Cause Description",type:"textarea",required:!0},{id:"impact_statement",label:"Impact Statement",type:"textarea",required:!0,placeholder:"What difference will donations make?"},{id:"ask",label:"The Ask",type:"textarea",required:!0,placeholder:"What are you asking donors to do?"},{id:"donation_details",label:"How to Donate",type:"textarea",required:!0},{id:"contact_name",label:"Contact Name",type:"text"},{id:"contact_email",label:"Contact Email",type:"email"}],bodyTemplate:`{{charity_name}}

{{letter_date}}

Dear {{recipient_name}},

{{cause_description}}

{{impact_statement}}

{{ask}}

**How to donate:**
{{donation_details}}

Thank you for your generosity and support.

Yours sincerely,

{{contact_name}}
{{charity_name}}
{{contact_email}}`},{id:"letter-legal-notice",builderId:"letter",name:"Legal Notice / Letter Before Action",description:"Letter before action or formal legal notice",category:"Legal",planRequired:"standard",status:"active",supportsBranding:!1,accentColor:"#374151",fields:[{id:"sender_name",label:"Your Full Name",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea",required:!0},{id:"sender_email",label:"Your Email",type:"email"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Recipient Full Name",type:"text",required:!0},{id:"recipient_address",label:"Recipient Address",type:"textarea",required:!0},{id:"matter",label:"Subject Matter",type:"text",required:!0},{id:"background",label:"Background",type:"textarea",required:!0},{id:"claim_details",label:"Claim / Demand Details",type:"textarea",required:!0},{id:"amount_owed",label:"Amount Owed (if applicable)",type:"text"},{id:"deadline",label:"Response Deadline",type:"text",defaultValue:"14 days"},{id:"consequence",label:"Consequence of Non-Response",type:"textarea",defaultValue:"If I do not receive a satisfactory response within the stated period, I will commence legal proceedings without further notice."}],bodyTemplate:`{{sender_name}}
{{sender_address}}
{{sender_email}}

{{letter_date}}

{{recipient_name}}
{{recipient_address}}

**WITHOUT PREJUDICE SAVE AS TO COSTS**

**Re: {{matter}}**

Dear {{recipient_name}},

**Background:**
{{background}}

**Claim / Demand:**
{{claim_details}}

**Amount owed: {{amount_owed}}**

You are required to respond within **{{deadline}}** of the date of this letter.

{{consequence}}

Yours faithfully,

{{sender_name}}`},{id:"letter-resignation-v2",builderId:"letter",name:"Resignation Letter",description:"Professional resignation letter with notice period",industries:["HR","Business","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!1,accentColor:"#1B4F8A",fields:[{id:"sender_name",label:"Your Name",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"manager_name",label:"Manager / HR Name",type:"text",required:!0},{id:"company_name",label:"Company Name",type:"text",required:!0},{id:"job_title",label:"Your Job Title",type:"text"},{id:"last_day",label:"Last Working Day",type:"date",required:!0},{id:"notice_period",label:"Notice Period",type:"text",defaultValue:"4 weeks"},{id:"reason",label:"Reason (optional)",type:"textarea",placeholder:"Brief reason for leaving — optional"},{id:"gratitude",label:"Gratitude / Positive Note",type:"textarea",defaultValue:"I have valued my time at the company and am grateful for the opportunities provided."}],bodyTemplate:`{{sender_name}}
{{sender_address}}

{{letter_date}}

{{manager_name}}
{{company_name}}

**Resignation — {{job_title}}**

Dear {{manager_name}},

I am writing to formally resign from my position as {{job_title}} at {{company_name}}, effective {{last_day}}, in accordance with my {{notice_period}} notice period.

{{reason}}

{{gratitude}}

I will do everything I can to ensure a smooth handover during my notice period.

Yours sincerely,

{{sender_name}}`},{id:"letter-resignation-immediate",builderId:"letter",name:"Immediate Resignation Letter",description:"Resignation without serving notice period",category:"Resignation & Leaving",industries:["HR","Business"],planRequired:"personal",status:"active",supportsBranding:!1,accentColor:"#1B4F8A",fields:[{id:"sender_name",label:"Your Name",type:"text",required:!0},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"manager_name",label:"Manager Name",type:"text",required:!0},{id:"company_name",label:"Company Name",type:"text",required:!0},{id:"job_title",label:"Your Job Title",type:"text"},{id:"reason",label:"Reason",type:"textarea",required:!0,placeholder:"Reason for immediate resignation (e.g. health, personal circumstances)"}],bodyTemplate:`{{sender_name}}

{{letter_date}}

{{manager_name}}
{{company_name}}

**Immediate Resignation — {{job_title}}**

Dear {{manager_name}},

I am writing to inform you of my immediate resignation from my position as {{job_title}} at {{company_name}}, effective today, {{letter_date}}.

{{reason}}

I apologise for any inconvenience this may cause and will assist with handover as far as reasonably possible.

Yours sincerely,

{{sender_name}}`},{id:"letter-apology-business",builderId:"letter",name:"Business Apology Letter",description:"Formal apology to a customer or client for a service failure",category:"Apology & Resolution",industries:["Business","Retail","Hospitality","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"sender_name",label:"Your Name / Organisation",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",required:!0},{id:"recipient_address",label:"Recipient Address",type:"textarea"},{id:"incident",label:"What Went Wrong",type:"textarea",required:!0},{id:"impact",label:"Impact Acknowledged",type:"textarea",placeholder:"Acknowledge the inconvenience caused"},{id:"remedy",label:"Remedy / Resolution Offered",type:"textarea",required:!0},{id:"prevention",label:"Steps to Prevent Recurrence",type:"textarea"}],bodyTemplate:`{{sender_name}}
{{sender_address}}

{{letter_date}}

{{recipient_name}}
{{recipient_address}}

**Formal Apology**

Dear {{recipient_name}},

I am writing to sincerely apologise regarding {{incident}}.

{{impact}}

To resolve this matter, we will {{remedy}}.

{{prevention}}

We value your custom and take matters like this very seriously. Please do not hesitate to contact us if you have any further concerns.

Yours sincerely,

{{sender_name}}`},{id:"letter-follow-up-invoice",builderId:"letter",name:"Invoice Follow-up Letter",description:"Politely chase an outstanding invoice payment",category:"Follow-up & Chasing",industries:["Finance","Business","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"sender_name",label:"Your Name / Organisation",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea"},{id:"sender_email",label:"Your Email",type:"email"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",required:!0},{id:"recipient_org",label:"Recipient Organisation",type:"text"},{id:"recipient_address",label:"Recipient Address",type:"textarea"},{id:"invoice_number",label:"Invoice Number",type:"text",required:!0},{id:"invoice_date",label:"Invoice Date",type:"date"},{id:"amount_due",label:"Amount Due (£)",type:"text",required:!0},{id:"due_date",label:"Original Due Date",type:"date"},{id:"bank_details",label:"Payment / Bank Details",type:"textarea"}],bodyTemplate:`{{sender_name}}
{{sender_address}}
{{sender_email}}

{{letter_date}}

{{recipient_name}}
{{recipient_org}}
{{recipient_address}}

**Outstanding Invoice — {{invoice_number}}**

Dear {{recipient_name}},

I am writing to draw your attention to invoice {{invoice_number}} dated {{invoice_date}}, for the sum of **£{{amount_due}}**, which was due for payment on {{due_date}}.

As of the date of this letter, we have not received payment. We would be grateful if you could arrange payment at your earliest convenience.

**Payment details:**
{{bank_details}}

If payment has already been made, please disregard this letter and accept our thanks. If you have any queries regarding this invoice, please do not hesitate to contact us.

Yours sincerely,

{{sender_name}}`},{id:"letter-follow-up-application",builderId:"letter",name:"Job Application Follow-up",description:"Follow up on a submitted job application",category:"Follow-up & Chasing",industries:["HR","Business","General"],planRequired:"personal",status:"active",supportsBranding:!1,accentColor:"#1B4F8A",fields:[{id:"sender_name",label:"Your Name",type:"text",required:!0},{id:"sender_email",label:"Your Email",type:"email"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"hiring_manager",label:"Hiring Manager / HR",type:"text",required:!0},{id:"company_name",label:"Company Name",type:"text",required:!0},{id:"job_title",label:"Job Title Applied For",type:"text",required:!0},{id:"applied_date",label:"Date Applied",type:"date"},{id:"enthusiasm",label:"Why You Are Interested",type:"textarea"}],bodyTemplate:`{{sender_name}}
{{sender_email}}

{{letter_date}}

{{hiring_manager}}
{{company_name}}

**Follow-up: Application for {{job_title}}**

Dear {{hiring_manager}},

I am writing to follow up on my application for the position of {{job_title}}, submitted on {{applied_date}}.

I remain very interested in this opportunity and would welcome the chance to discuss my application further. {{enthusiasm}}

I am happy to provide any additional information you may require and look forward to hearing from you.

Yours sincerely,

{{sender_name}}`},{id:"letter-notice-rent-increase",builderId:"letter",name:"Rent Increase Notice",description:"Formal notice to tenant of a rent increase",category:"Notices & Announcements",industries:["Property","Business"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"landlord_name",label:"Landlord / Agent Name",type:"text",required:!0},{id:"landlord_address",label:"Landlord Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"tenant_name",label:"Tenant Name(s)",type:"text",required:!0},{id:"property_address",label:"Property Address",type:"textarea",required:!0},{id:"current_rent",label:"Current Rent (£/month)",type:"text",required:!0},{id:"new_rent",label:"New Rent (£/month)",type:"text",required:!0},{id:"effective_date",label:"Effective Date",type:"date",required:!0},{id:"reason",label:"Reason (optional)",type:"textarea"}],bodyTemplate:`{{landlord_name}}
{{landlord_address}}

{{letter_date}}

{{tenant_name}}
{{property_address}}

**Notice of Rent Increase**

Dear {{tenant_name}},

I am writing to inform you that the rent for the above property will increase from **£{{current_rent}} per month** to **£{{new_rent}} per month**, effective from **{{effective_date}}**.

{{reason}}

This notice is provided in accordance with the terms of your tenancy agreement and applicable legislation. If you have any questions, please do not hesitate to contact me.

Yours sincerely,

{{landlord_name}}`},{id:"letter-notice-redundancy",builderId:"letter",name:"Redundancy Notice Letter",description:"Formal notice of redundancy to an employee",category:"Notices & Announcements",industries:["HR","Business"],planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"company_name",label:"Company Name",type:"text",required:!0},{id:"company_address",label:"Company Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"employee_name",label:"Employee Name",type:"text",required:!0},{id:"employee_address",label:"Employee Address",type:"textarea"},{id:"job_title",label:"Job Title",type:"text"},{id:"last_day",label:"Last Day of Employment",type:"date",required:!0},{id:"notice_period",label:"Notice Period",type:"text",defaultValue:"4 weeks"},{id:"redundancy_pay",label:"Redundancy Pay Details",type:"textarea"},{id:"reason",label:"Reason for Redundancy",type:"textarea",required:!0},{id:"appeal_rights",label:"Appeal Rights",type:"textarea",defaultValue:"You have the right to appeal this decision within 5 working days of receiving this letter."}],bodyTemplate:`{{company_name}}
{{company_address}}

{{letter_date}}

{{employee_name}}
{{employee_address}}

**Notice of Redundancy — {{job_title}}**

Dear {{employee_name}},

Following the recent consultation process, I am writing to confirm that your position of {{job_title}} has been made redundant.

**Reason for redundancy:**
{{reason}}

Your employment will end on **{{last_day}}**, following your {{notice_period}} notice period.

**Redundancy pay:**
{{redundancy_pay}}

**Your right to appeal:**
{{appeal_rights}}

We thank you for your contribution to {{company_name}} and wish you well for the future.

Yours sincerely,

On behalf of {{company_name}}`},{id:"letter-supplier-termination",builderId:"letter",name:"Supplier Contract Termination",description:"Formally terminate a supplier or service contract",category:"Supplier & Procurement",industries:["Business","Finance","General"],planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"sender_name",label:"Your Name / Organisation",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"supplier_name",label:"Supplier Name",type:"text",required:!0},{id:"supplier_address",label:"Supplier Address",type:"textarea"},{id:"contract_ref",label:"Contract Reference",type:"text"},{id:"termination_date",label:"Termination Date",type:"date",required:!0},{id:"reason",label:"Reason for Termination",type:"textarea",required:!0},{id:"outstanding",label:"Outstanding Obligations",type:"textarea",placeholder:"Any outstanding payments, returns, or handover requirements"}],bodyTemplate:`{{sender_name}}
{{sender_address}}

{{letter_date}}

{{supplier_name}}
{{supplier_address}}

**Notice of Contract Termination — {{contract_ref}}**

Dear Sir / Madam,

We are writing to formally notify you that we are terminating our contract with {{supplier_name}}, reference {{contract_ref}}, with effect from **{{termination_date}}**.

**Reason:**
{{reason}}

**Outstanding obligations:**
{{outstanding}}

Please confirm receipt of this notice and arrange for any outstanding matters to be resolved by the termination date.

Yours faithfully,

{{sender_name}}`},{id:"letter-customer-refund",builderId:"letter",name:"Customer Refund Letter",description:"Confirm a refund to a customer with details",category:"Customer Service",industries:["Retail","Business","Hospitality","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"sender_name",label:"Your Name / Organisation",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"customer_name",label:"Customer Name",type:"text",required:!0},{id:"customer_address",label:"Customer Address",type:"textarea"},{id:"order_ref",label:"Order / Reference Number",type:"text"},{id:"refund_amount",label:"Refund Amount (£)",type:"text",required:!0},{id:"refund_method",label:"Refund Method",type:"text",defaultValue:"original payment method"},{id:"refund_timeframe",label:"Expected Timeframe",type:"text",defaultValue:"3–5 working days"},{id:"reason",label:"Reason for Refund",type:"textarea"}],bodyTemplate:`{{sender_name}}
{{sender_address}}

{{letter_date}}

{{customer_name}}
{{customer_address}}

**Refund Confirmation — {{order_ref}}**

Dear {{customer_name}},

Thank you for contacting us regarding your recent order ({{order_ref}}).

We are pleased to confirm that a refund of **£{{refund_amount}}** has been processed to your {{refund_method}}. You should expect to receive this within {{refund_timeframe}}.

{{reason}}

We apologise for any inconvenience caused and thank you for your patience. If you have any further questions, please do not hesitate to contact us.

Yours sincerely,

{{sender_name}}`},{id:"letter-debt-final-notice",builderId:"letter",name:"Final Debt Notice",description:"Final notice before legal action for unpaid debt",category:"Debt & Finance",industries:["Finance","Business","Legal"],planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#dc2626",fields:[{id:"sender_name",label:"Your Name / Organisation",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"debtor_name",label:"Debtor Name",type:"text",required:!0},{id:"debtor_address",label:"Debtor Address",type:"textarea"},{id:"amount_owed",label:"Total Amount Owed (£)",type:"text",required:!0},{id:"original_due",label:"Original Due Date",type:"date"},{id:"payment_deadline",label:"Payment Deadline",type:"date",required:!0},{id:"account_ref",label:"Account / Reference",type:"text"},{id:"payment_details",label:"Payment Details",type:"textarea"}],bodyTemplate:`{{sender_name}}
{{sender_address}}

{{letter_date}}

{{debtor_name}}
{{debtor_address}}

**FINAL NOTICE — Outstanding Debt: £{{amount_owed}} — Ref: {{account_ref}}**

Dear {{debtor_name}},

Despite previous correspondence, the sum of **£{{amount_owed}}** remains outstanding on your account (Ref: {{account_ref}}), which was due on {{original_due}}.

**This is your final notice.** Unless full payment is received by **{{payment_deadline}}**, we will have no alternative but to pursue this matter through the courts without further notice.

**To make payment:**
{{payment_details}}

If you are experiencing financial difficulties, please contact us immediately to discuss a payment arrangement.

Yours faithfully,

{{sender_name}}`},{id:"letter-personal-reference",builderId:"letter",name:"Personal Reference Letter",description:"Character or personal reference for an individual",category:"Personal",industries:["General","Education","HR"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!1,accentColor:"#1B4F8A",fields:[{id:"referee_name",label:"Your Name (Referee)",type:"text",required:!0},{id:"referee_address",label:"Your Address",type:"textarea"},{id:"referee_email",label:"Your Email",type:"email"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"subject_name",label:"Name of Person Being Referenced",type:"text",required:!0},{id:"relationship",label:"Your Relationship to Them",type:"text",required:!0,placeholder:"e.g. Colleague, Neighbour, Friend"},{id:"duration",label:"How Long You Have Known Them",type:"text",required:!0},{id:"qualities",label:"Key Qualities / Strengths",type:"textarea",required:!0},{id:"specific_example",label:"Specific Example",type:"textarea"},{id:"recommendation",label:"Recommendation Statement",type:"textarea",defaultValue:"I have no hesitation in recommending them and am happy to be contacted for further information."}],bodyTemplate:`{{referee_name}}
{{referee_address}}
{{referee_email}}

{{letter_date}}

**To Whom It May Concern**

**Personal Reference for {{subject_name}}**

I am pleased to provide this reference for {{subject_name}}, whom I have known as {{relationship}} for {{duration}}.

{{qualities}}

{{specific_example}}

{{recommendation}}

Yours faithfully,

{{referee_name}}`},{id:"letter-school-absence-v2",builderId:"letter",name:"School Absence Letter",description:"Notify school of a child's absence",planRequired:"personal",status:"active",supportsBranding:!1,accentColor:"#1B4F8A",fields:[{id:"parent_name",label:"Parent / Guardian Name",type:"text",required:!0},{id:"parent_address",label:"Your Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"teacher_name",label:"Teacher / Head of Year",type:"text",defaultValue:"The Class Teacher"},{id:"school_name",label:"School Name",type:"text",required:!0},{id:"child_name",label:"Child's Name",type:"text",required:!0},{id:"child_class",label:"Class / Year Group",type:"text"},{id:"absence_dates",label:"Absence Dates",type:"text",required:!0},{id:"reason",label:"Reason for Absence",type:"textarea",required:!0},{id:"return_date",label:"Expected Return Date",type:"date"}],bodyTemplate:`{{parent_name}}
{{parent_address}}

{{letter_date}}

{{teacher_name}}
{{school_name}}

**Absence Notification — {{child_name}}, {{child_class}}**

Dear {{teacher_name}},

I am writing to inform you that my child, {{child_name}} ({{child_class}}), will be absent from school on {{absence_dates}}.

**Reason:** {{reason}}

{{child_name}} is expected to return on {{return_date}}. Please let me know if any work needs to be completed during the absence.

Yours sincerely,

{{parent_name}}`},{id:"letter-school-holiday-request",builderId:"letter",name:"School Holiday Request",description:"Request authorised absence for a family holiday",category:"School & Education",industries:["Education","Personal"],planRequired:"personal",status:"active",supportsBranding:!1,accentColor:"#1B4F8A",fields:[{id:"parent_name",label:"Parent / Guardian Name",type:"text",required:!0},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"headteacher_name",label:"Headteacher Name",type:"text",defaultValue:"The Headteacher"},{id:"school_name",label:"School Name",type:"text",required:!0},{id:"child_name",label:"Child's Name",type:"text",required:!0},{id:"child_class",label:"Class / Year Group",type:"text"},{id:"holiday_dates",label:"Holiday Dates",type:"text",required:!0},{id:"destination",label:"Destination (optional)",type:"text"},{id:"reason",label:"Reason / Exceptional Circumstances",type:"textarea",required:!0}],bodyTemplate:`{{parent_name}}

{{letter_date}}

{{headteacher_name}}
{{school_name}}

**Request for Authorised Absence — {{child_name}}, {{child_class}}**

Dear {{headteacher_name}},

I am writing to request authorised absence for my child, {{child_name}} ({{child_class}}), from {{holiday_dates}}.

**Reason:** {{reason}}

{{destination}}

I understand the importance of regular attendance and will ensure that {{child_name}} keeps up with any missed work. I would be grateful for your consideration of this request.

Yours sincerely,

{{parent_name}}`},{id:"letter-charity-donation-request",builderId:"letter",name:"Charity Donation Request",description:"Request a donation or sponsorship from a business or individual",category:"Charity & Voluntary",industries:["Charity","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"charity_name",label:"Charity / Organisation Name",type:"text",required:!0},{id:"charity_address",label:"Charity Address",type:"textarea"},{id:"charity_reg",label:"Charity Registration No.",type:"text"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",required:!0},{id:"recipient_org",label:"Recipient Organisation",type:"text"},{id:"recipient_address",label:"Recipient Address",type:"textarea"},{id:"cause",label:"Cause / Mission",type:"textarea",required:!0},{id:"specific_ask",label:"Specific Request",type:"textarea",required:!0,placeholder:"e.g. A donation of £500 / sponsorship of our annual event"},{id:"impact",label:"Impact of Donation",type:"textarea"},{id:"contact_name",label:"Contact Name",type:"text"},{id:"contact_email",label:"Contact Email",type:"email"}],bodyTemplate:`{{charity_name}}
{{charity_address}}
Registered Charity No: {{charity_reg}}

{{letter_date}}

{{recipient_name}}
{{recipient_org}}
{{recipient_address}}

**Request for Donation / Support**

Dear {{recipient_name}},

I am writing on behalf of {{charity_name}} to request your support for our work.

**About us:**
{{cause}}

**Our request:**
{{specific_ask}}

**The impact:**
{{impact}}

Any support you are able to provide would be greatly appreciated. For further information, please contact {{contact_name}} at {{contact_email}}.

Yours sincerely,

{{contact_name}}
{{charity_name}}`},{id:"letter-hr-job-offer",builderId:"letter",name:"Job Offer Letter",description:"Formal job offer letter to a successful candidate",category:"HR & Employment",industries:["HR","Business","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"company_name",label:"Company Name",type:"text",required:!0},{id:"company_address",label:"Company Address",type:"textarea"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"candidate_name",label:"Candidate Name",type:"text",required:!0},{id:"candidate_address",label:"Candidate Address",type:"textarea"},{id:"job_title",label:"Job Title",type:"text",required:!0},{id:"start_date",label:"Start Date",type:"date",required:!0},{id:"salary",label:"Salary (£)",type:"text",required:!0},{id:"hours",label:"Working Hours",type:"text",defaultValue:"37.5 hours per week"},{id:"location",label:"Work Location",type:"text"},{id:"probation",label:"Probation Period",type:"text",defaultValue:"3 months"},{id:"conditions",label:"Conditions of Offer",type:"textarea",placeholder:"e.g. Subject to satisfactory references and DBS check"},{id:"hr_contact",label:"HR Contact Name",type:"text"}],bodyTemplate:`{{company_name}}
{{company_address}}

{{letter_date}}

{{candidate_name}}
{{candidate_address}}

**Offer of Employment — {{job_title}}**

Dear {{candidate_name}},

Following your recent interview, I am delighted to offer you the position of **{{job_title}}** at {{company_name}}.

**Key terms of your employment:**
- **Start date:** {{start_date}}
- **Salary:** £{{salary}} per annum
- **Hours:** {{hours}}
- **Location:** {{location}}
- **Probation period:** {{probation}}

**Conditions of offer:**
{{conditions}}

Please sign and return the enclosed copy of this letter to confirm your acceptance. A formal contract of employment will follow.

If you have any questions, please contact {{hr_contact}}.

We look forward to welcoming you to the team.

Yours sincerely,

On behalf of {{company_name}}`},{id:"letter-hr-disciplinary",builderId:"letter",name:"Disciplinary Hearing Invitation",description:"Invite an employee to a formal disciplinary hearing",category:"HR & Employment",industries:["HR","Business"],planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"company_name",label:"Company Name",type:"text",required:!0},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"employee_name",label:"Employee Name",type:"text",required:!0},{id:"employee_address",label:"Employee Address",type:"textarea"},{id:"job_title",label:"Job Title",type:"text"},{id:"hearing_date",label:"Hearing Date & Time",type:"text",required:!0},{id:"hearing_location",label:"Hearing Location",type:"text",required:!0},{id:"allegations",label:"Allegations / Concerns",type:"textarea",required:!0},{id:"evidence",label:"Evidence to Be Considered",type:"textarea"},{id:"companion_rights",label:"Companion Rights",type:"textarea",defaultValue:"You have the right to be accompanied by a colleague or trade union representative."}],bodyTemplate:`{{company_name}}

{{letter_date}}

{{employee_name}}
{{employee_address}}

**Invitation to Disciplinary Hearing — Private & Confidential**

Dear {{employee_name}},

I am writing to invite you to attend a formal disciplinary hearing regarding the following concerns:

**Allegations:**
{{allegations}}

**The hearing will take place:**
Date & Time: {{hearing_date}}
Location: {{hearing_location}}

**Evidence to be considered:**
{{evidence}}

**Your rights:**
{{companion_rights}}

Please confirm your attendance. Failure to attend without good reason may result in the hearing proceeding in your absence.

Yours sincerely,

On behalf of {{company_name}}`},{id:"letter-property-section21",builderId:"letter",name:"Section 21 Notice (No-Fault Eviction)",description:"Notice to end an assured shorthold tenancy (England)",category:"Property & Housing",industries:["Property","Legal"],planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"landlord_name",label:"Landlord Name",type:"text",required:!0},{id:"landlord_address",label:"Landlord Address",type:"textarea"},{id:"letter_date",label:"Date of Notice",type:"date",required:!0},{id:"tenant_name",label:"Tenant Name(s)",type:"text",required:!0},{id:"property_address",label:"Property Address",type:"textarea",required:!0},{id:"vacate_date",label:"Date to Vacate",type:"date",required:!0},{id:"tenancy_start",label:"Tenancy Start Date",type:"date"}],bodyTemplate:`{{landlord_name}}
{{landlord_address}}

{{letter_date}}

{{tenant_name}}
{{property_address}}

**NOTICE REQUIRING POSSESSION — SECTION 21 HOUSING ACT 1988**

Dear {{tenant_name}},

I hereby give you notice that I require possession of the property known as:

**{{property_address}}**

on or after **{{vacate_date}}**, being not less than two months from the date of this notice.

This notice is served under Section 21(1)(b) of the Housing Act 1988 (as amended).

Your tenancy commenced on {{tenancy_start}}.

**Important:** This notice does not mean you must leave immediately. You may wish to seek independent legal advice.

Yours faithfully,

{{landlord_name}}`},{id:"letter-legal-before-action",builderId:"letter",name:"Letter Before Action (LBA)",description:"Pre-litigation letter before taking legal action",category:"Legal",industries:["Legal","Finance","Business"],popular:!0,planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"sender_name",label:"Your Name / Organisation",type:"text",required:!0},{id:"sender_address",label:"Your Address",type:"textarea"},{id:"sender_email",label:"Your Email",type:"email"},{id:"letter_date",label:"Date",type:"date",required:!0},{id:"respondent_name",label:"Respondent Name",type:"text",required:!0},{id:"respondent_address",label:"Respondent Address",type:"textarea"},{id:"claim_summary",label:"Summary of Claim",type:"textarea",required:!0},{id:"amount_claimed",label:"Amount Claimed (£)",type:"text"},{id:"remedy_sought",label:"Remedy Sought",type:"textarea",required:!0},{id:"response_deadline",label:"Response Deadline (days)",type:"text",defaultValue:"14"}],bodyTemplate:`{{sender_name}}
{{sender_address}}
{{sender_email}}

{{letter_date}}

{{respondent_name}}
{{respondent_address}}

**LETTER BEFORE ACTION — WITHOUT PREJUDICE SAVE AS TO COSTS**

Dear {{respondent_name}},

We write in connection with the following matter:

**Summary of claim:**
{{claim_summary}}

**Amount claimed:** £{{amount_claimed}}

**Remedy sought:**
{{remedy_sought}}

Unless we receive a satisfactory response within **{{response_deadline}} days** of the date of this letter, we reserve the right to commence legal proceedings without further notice. In such event, we will seek to recover all costs incurred.

Yours faithfully,

{{sender_name}}`}],a=[{id:"email-welcome",builderId:"email",name:"Welcome Email",description:"Welcome a new customer, member, or subscriber",category:"Customer Service",planRequired:"free",status:"active",popular:!0,supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"[Customer Name]"},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Welcome to {{org_name}}!",required:!0},{id:"welcome_message",label:"Welcome Message",type:"textarea",required:!0},{id:"next_steps",label:"Next Steps / Getting Started",type:"textarea"},{id:"contact_info",label:"Contact / Support Info",type:"textarea"},{id:"sender_name",label:"Sender Name",type:"text"},{id:"sender_title",label:"Sender Title",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{recipient_name}},

{{welcome_message}}

**Getting started:**
{{next_steps}}

**Need help?**
{{contact_info}}

Warm regards,

{{sender_name}}
{{sender_title}}
{{org_name}}`},{id:"email-thank-you",builderId:"email",name:"Thank You Email",description:"Thank a customer, client, or partner",category:"Customer Service",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"[Name]"},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Thank you from {{org_name}}",required:!0},{id:"reason",label:"Reason for Thanks",type:"textarea",required:!0},{id:"impact",label:"Impact / What It Means",type:"textarea"},{id:"next_action",label:"Next Steps (optional)",type:"textarea"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{recipient_name}},

{{reason}}

{{impact}}

{{next_action}}

With gratitude,

{{sender_name}}
{{org_name}}`},{id:"email-order-confirmation",builderId:"email",name:"Order Confirmation",description:"Confirm a customer order or booking",category:"Customer Service",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#1B4F8A",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Customer Name",type:"text",defaultValue:"[Customer Name]"},{id:"order_ref",label:"Order / Booking Reference",type:"text",required:!0},{id:"order_date",label:"Order Date",type:"date",required:!0},{id:"order_details",label:"Order Details",type:"textarea",required:!0},{id:"total_amount",label:"Total Amount",type:"text"},{id:"delivery_info",label:"Delivery / Fulfilment Info",type:"textarea"},{id:"contact_info",label:"Contact / Support Info",type:"textarea"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: Order Confirmation — Ref: {{order_ref}}

Dear {{recipient_name}},

Thank you for your order. We are pleased to confirm the following:

**Order Reference:** {{order_ref}}
**Order Date:** {{order_date}}

**Order Details:**
{{order_details}}

**Total:** {{total_amount}}

**Delivery / Fulfilment:**
{{delivery_info}}

If you have any questions, please contact us:
{{contact_info}}

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-complaint-acknowledgement",builderId:"email",name:"Complaint Acknowledgement",description:"Acknowledge receipt of a customer complaint",category:"Complaints",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#dc2626",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Customer Name",type:"text",defaultValue:"[Customer Name]"},{id:"complaint_ref",label:"Complaint Reference",type:"text",required:!0},{id:"complaint_summary",label:"Brief Summary of Complaint",type:"textarea",required:!0},{id:"response_timeline",label:"Response Timeline",type:"text",defaultValue:"within 5 working days"},{id:"contact_name",label:"Contact Name",type:"text"},{id:"contact_email",label:"Contact Email",type:"email"}],bodyTemplate:`Subject: Complaint Acknowledgement — Ref: {{complaint_ref}}

Dear {{recipient_name}},

Thank you for contacting us. We have received your complaint and want to assure you that we take all feedback seriously.

**Complaint Reference:** {{complaint_ref}}

**Summary of your complaint:**
{{complaint_summary}}

We will investigate this matter thoroughly and aim to provide a full response **{{response_timeline}}**.

In the meantime, if you have any questions, please contact {{contact_name}} at {{contact_email}}.

Yours sincerely,

{{contact_name}}
{{org_name}}`},{id:"email-complaint-resolution",builderId:"email",name:"Complaint Resolution",description:"Provide the outcome and resolution of a complaint",category:"Complaints",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#dc2626",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Customer Name",type:"text",defaultValue:"[Customer Name]"},{id:"complaint_ref",label:"Complaint Reference",type:"text",required:!0},{id:"outcome",label:"Outcome",type:"select",options:["Complaint upheld","Complaint partially upheld","Complaint not upheld"],defaultValue:"Complaint upheld"},{id:"resolution",label:"Resolution / Action Taken",type:"textarea",required:!0},{id:"apology",label:"Apology (if applicable)",type:"textarea"},{id:"escalation",label:"Escalation Rights",type:"textarea",defaultValue:"If you remain dissatisfied, you may escalate this matter to the relevant ombudsman."},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: Complaint Resolution — Ref: {{complaint_ref}}

Dear {{recipient_name}},

Thank you for your patience while we investigated your complaint (Ref: {{complaint_ref}}).

**Outcome: {{outcome}}**

{{apology}}

**Resolution:**
{{resolution}}

{{escalation}}

Yours sincerely,

{{sender_name}}
{{org_name}}`},{id:"email-invoice",builderId:"email",name:"Invoice Email",description:"Send an invoice to a client or customer",category:"Finance & Billing",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Client Name",type:"text",defaultValue:"[Client Name]"},{id:"invoice_number",label:"Invoice Number",type:"text",required:!0},{id:"invoice_amount",label:"Invoice Amount",type:"text",required:!0},{id:"due_date",label:"Payment Due Date",type:"date",required:!0},{id:"payment_details",label:"Payment Details",type:"textarea",required:!0,placeholder:"Bank name, sort code, account number, reference"},{id:"services",label:"Services / Description",type:"textarea"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: Invoice {{invoice_number}} from {{org_name}}

Dear {{recipient_name}},

Please find attached Invoice {{invoice_number}} for the amount of **{{invoice_amount}}**, due by **{{due_date}}**.

**Services:**
{{services}}

**Payment details:**
{{payment_details}}

If you have any questions regarding this invoice, please do not hesitate to contact us.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-payment-reminder",builderId:"email",name:"Payment Reminder",description:"Polite reminder for an outstanding payment",category:"Finance & Billing",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Client Name",type:"text",defaultValue:"[Client Name]"},{id:"invoice_number",label:"Invoice Number",type:"text",required:!0},{id:"invoice_amount",label:"Amount Outstanding",type:"text",required:!0},{id:"original_due",label:"Original Due Date",type:"date",required:!0},{id:"reminder_type",label:"Reminder Type",type:"select",options:["Friendly Reminder","Second Reminder","Final Notice"],defaultValue:"Friendly Reminder"},{id:"payment_details",label:"Payment Details",type:"textarea",required:!0},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{reminder_type}} — Invoice {{invoice_number}} — {{invoice_amount}} Outstanding

Dear {{recipient_name}},

This is a {{reminder_type}} regarding Invoice {{invoice_number}} for **{{invoice_amount}}**, which was due on {{original_due}}.

If you have already made payment, please disregard this email. If not, we would be grateful if you could arrange payment at your earliest convenience.

**Payment details:**
{{payment_details}}

If you have any queries, please do not hesitate to contact us.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-appointment-confirmation",builderId:"email",name:"Appointment Confirmation",description:"Confirm an appointment, meeting, or booking",category:"Appointment",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#0f766e",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"[Name]"},{id:"appointment_type",label:"Appointment Type",type:"text",required:!0,placeholder:"e.g. Consultation, Meeting, Service"},{id:"appointment_date",label:"Date",type:"date",required:!0},{id:"appointment_time",label:"Time",type:"text",required:!0},{id:"location",label:"Location / Platform",type:"text"},{id:"preparation",label:"What to Bring / Prepare",type:"textarea"},{id:"cancellation",label:"Cancellation Policy",type:"textarea",defaultValue:"If you need to cancel or rearrange, please give us at least 24 hours' notice."},{id:"contact_info",label:"Contact Info",type:"textarea"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: Appointment Confirmation — {{appointment_type}} on {{appointment_date}}

Dear {{recipient_name}},

We are pleased to confirm your {{appointment_type}} with {{org_name}}.

**Date:** {{appointment_date}}
**Time:** {{appointment_time}}
**Location:** {{location}}

**What to bring / prepare:**
{{preparation}}

**Cancellation policy:**
{{cancellation}}

If you have any questions, please contact us:
{{contact_info}}

We look forward to seeing you.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-appointment-reminder",builderId:"email",name:"Appointment Reminder",description:"Remind a client or customer of an upcoming appointment",category:"Appointment",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#0f766e",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"[Name]"},{id:"appointment_type",label:"Appointment Type",type:"text",required:!0},{id:"appointment_date",label:"Date",type:"date",required:!0},{id:"appointment_time",label:"Time",type:"text",required:!0},{id:"location",label:"Location / Platform",type:"text"},{id:"contact_info",label:"Contact / Rescheduling Info",type:"textarea"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: Reminder — {{appointment_type}} on {{appointment_date}}

Dear {{recipient_name}},

This is a friendly reminder of your upcoming {{appointment_type}} with {{org_name}}.

**Date:** {{appointment_date}}
**Time:** {{appointment_time}}
**Location:** {{location}}

If you need to reschedule or have any questions:
{{contact_info}}

We look forward to seeing you.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-follow-up",builderId:"email",name:"Follow-Up Email",description:"Follow up after a meeting, call, or proposal",category:"Follow-up",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"[Name]"},{id:"context",label:"Context (what you're following up on)",type:"textarea",required:!0},{id:"summary",label:"Summary / Key Points",type:"textarea"},{id:"action_items",label:"Action Items / Next Steps",type:"textarea"},{id:"cta",label:"Call to Action",type:"textarea",placeholder:"What do you want the recipient to do?"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: Following up — {{context}}

Dear {{recipient_name}},

I wanted to follow up regarding {{context}}.

{{summary}}

**Next steps / action items:**
{{action_items}}

{{cta}}

Please do not hesitate to get in touch if you have any questions.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-internal-announcement",builderId:"email",name:"Internal Announcement",description:"Announce news, changes, or updates to staff",category:"Internal",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#374151",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"subject",label:"Email Subject",type:"text",required:!0},{id:"announcement",label:"Announcement Details",type:"textarea",required:!0},{id:"action_required",label:"Action Required (if any)",type:"textarea"},{id:"effective_date",label:"Effective Date",type:"date"},{id:"contact_for_questions",label:"Contact for Questions",type:"text"},{id:"sender_name",label:"Sender Name",type:"text"},{id:"sender_title",label:"Sender Title",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear Team,

{{announcement}}

**Effective date:** {{effective_date}}

**Action required:**
{{action_required}}

If you have any questions, please contact {{contact_for_questions}}.

Kind regards,

{{sender_name}}
{{sender_title}}
{{org_name}}`},{id:"email-meeting-invite",builderId:"email",name:"Meeting Invitation",description:"Invite colleagues or clients to a meeting",category:"Internal",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#374151",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"[Name]"},{id:"meeting_title",label:"Meeting Title",type:"text",required:!0},{id:"meeting_date",label:"Date",type:"date",required:!0},{id:"meeting_time",label:"Time",type:"text",required:!0},{id:"location",label:"Location / Platform",type:"text"},{id:"agenda",label:"Agenda",type:"textarea"},{id:"preparation",label:"Preparation Required",type:"textarea"},{id:"rsvp_by",label:"RSVP By",type:"date"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: Meeting Invitation — {{meeting_title}} — {{meeting_date}}

Dear {{recipient_name}},

You are invited to attend the following meeting:

**{{meeting_title}}**
**Date:** {{meeting_date}}
**Time:** {{meeting_time}}
**Location:** {{location}}

**Agenda:**
{{agenda}}

**Preparation required:**
{{preparation}}

Please RSVP by {{rsvp_by}}.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-new-employee",builderId:"email",name:"New Employee Welcome",description:"Welcome a new employee on their first day",category:"Onboarding",planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"employee_name",label:"Employee Name",type:"text",required:!0},{id:"job_title",label:"Job Title",type:"text",required:!0},{id:"start_date",label:"Start Date",type:"date",required:!0},{id:"manager_name",label:"Line Manager Name",type:"text"},{id:"first_day_info",label:"First Day Information",type:"textarea",required:!0,placeholder:"Where to go, what time, who to ask for"},{id:"it_access",label:"IT / System Access Info",type:"textarea"},{id:"useful_contacts",label:"Useful Contacts",type:"textarea"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: Welcome to {{org_name}}, {{employee_name}}!

Dear {{employee_name}},

We are delighted to welcome you to {{org_name}} as our new {{job_title}}. We are looking forward to you joining us on {{start_date}}.

**Your first day:**
{{first_day_info}}

**IT and system access:**
{{it_access}}

**Useful contacts:**
{{useful_contacts}}

Your line manager is {{manager_name}}, who will be in touch to help you settle in.

If you have any questions before you start, please do not hesitate to reach out.

Warm regards,

{{sender_name}}
{{org_name}}`},{id:"email-school-newsletter",builderId:"email",name:"School Newsletter",description:"School newsletter or parent communication email",category:"School & Education",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#0891b2",fields:[{id:"school_name",label:"School Name",type:"text",required:!0},{id:"issue_date",label:"Issue Date",type:"date",required:!0},{id:"head_teacher",label:"Head Teacher / Principal",type:"text"},{id:"news_items",label:"News & Updates",type:"textarea",required:!0},{id:"upcoming_events",label:"Upcoming Events",type:"textarea"},{id:"reminders",label:"Reminders",type:"textarea"},{id:"contact_info",label:"Contact Information",type:"textarea"}],bodyTemplate:`Subject: {{school_name}} Newsletter — {{issue_date}}

Dear Parents and Carers,

Welcome to our latest newsletter from {{school_name}}.

**News & Updates:**
{{news_items}}

**Upcoming Events:**
{{upcoming_events}}

**Reminders:**
{{reminders}}

**Contact us:**
{{contact_info}}

Kind regards,

{{head_teacher}}
{{school_name}}`},{id:"email-volunteer-recruitment",builderId:"email",name:"Volunteer Recruitment",description:"Recruit volunteers for your charity or organisation",category:"Charity & Voluntary",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"Dear Friend"},{id:"cause",label:"Your Cause",type:"textarea",required:!0},{id:"volunteer_roles",label:"Volunteer Roles Available",type:"textarea",required:!0},{id:"commitment",label:"Time Commitment",type:"text"},{id:"benefits",label:"Benefits of Volunteering",type:"textarea"},{id:"how_to_apply",label:"How to Apply / Get Involved",type:"textarea",required:!0},{id:"contact_name",label:"Contact Name",type:"text"},{id:"contact_email",label:"Contact Email",type:"email"}],bodyTemplate:`Subject: Volunteer with {{org_name}} — Make a Difference

{{recipient_name}},

{{cause}}

**We are looking for volunteers to help with:**
{{volunteer_roles}}

**Time commitment:** {{commitment}}

**Benefits of volunteering with us:**
{{benefits}}

**How to get involved:**
{{how_to_apply}}

For more information, contact {{contact_name}} at {{contact_email}}.

Thank you for considering volunteering with us.

Warm regards,

{{contact_name}}
{{org_name}}`},{id:"email-hr-interview-invite",builderId:"email",name:"Interview Invitation",description:"Invite a candidate to attend a job interview",category:"HR & Employment",industries:["HR","Business","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"candidate_name",label:"Candidate Name",type:"text",defaultValue:"[Candidate Name]"},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Interview Invitation — [Job Title]",required:!0},{id:"job_title",label:"Job Title",type:"text",required:!0},{id:"interview_date",label:"Interview Date & Time",type:"text",required:!0},{id:"interview_location",label:"Location / Video Link",type:"text",required:!0},{id:"interview_format",label:"Interview Format",type:"textarea",defaultValue:"The interview will last approximately 45 minutes and will include a competency-based discussion."},{id:"what_to_bring",label:"What to Bring",type:"textarea",placeholder:"e.g. ID, portfolio, references"},{id:"contact_name",label:"Contact Name",type:"text"},{id:"contact_email",label:"Contact Email",type:"email"},{id:"sender_name",label:"Sender Name",type:"text"},{id:"sender_title",label:"Sender Title",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{candidate_name}},

Thank you for your application for the position of **{{job_title}}** at {{org_name}}.

We are pleased to invite you to attend an interview:

**Date & Time:** {{interview_date}}
**Location:** {{interview_location}}

**Interview format:**
{{interview_format}}

**What to bring:**
{{what_to_bring}}

Please confirm your attendance by replying to this email or contacting {{contact_name}} at {{contact_email}}.

We look forward to meeting you.

Kind regards,

{{sender_name}}
{{sender_title}}
{{org_name}}`},{id:"email-hr-rejection",builderId:"email",name:"Job Application Rejection",description:"Politely decline a job applicant",category:"HR & Employment",industries:["HR","Business"],planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"candidate_name",label:"Candidate Name",type:"text",defaultValue:"[Candidate Name]"},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Your Application — [Job Title]",required:!0},{id:"job_title",label:"Job Title",type:"text",required:!0},{id:"feedback",label:"Brief Feedback (optional)",type:"textarea",placeholder:"Optional constructive feedback"},{id:"future_roles",label:"Future Roles Note",type:"text",defaultValue:"We will keep your details on file for future opportunities."},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{candidate_name}},

Thank you for taking the time to apply for the position of {{job_title}} at {{org_name}} and for attending our selection process.

After careful consideration, we regret to inform you that on this occasion your application has been unsuccessful.

{{feedback}}

{{future_roles}}

We wish you every success in your job search.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-hr-contract-offer",builderId:"email",name:"Employment Contract Offer",description:"Send an employment contract offer by email",category:"HR & Employment",industries:["HR","Business"],planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"candidate_name",label:"Candidate Name",type:"text",defaultValue:"[Name]"},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Employment Offer — [Job Title]",required:!0},{id:"job_title",label:"Job Title",type:"text",required:!0},{id:"start_date",label:"Start Date",type:"text"},{id:"salary",label:"Salary",type:"text"},{id:"deadline",label:"Acceptance Deadline",type:"text",defaultValue:"Please confirm acceptance within 5 working days."},{id:"hr_contact",label:"HR Contact",type:"text"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{candidate_name}},

I am delighted to offer you the position of **{{job_title}}** at {{org_name}}.

**Start date:** {{start_date}}
**Salary:** {{salary}}

Please find your contract of employment attached. {{deadline}}

If you have any questions, please contact {{hr_contact}}.

We look forward to welcoming you to the team.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-supplier-order",builderId:"email",name:"Purchase Order Email",description:"Send a purchase order to a supplier",category:"Supplier & Procurement",industries:["Business","Finance","Retail","Construction"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"supplier_name",label:"Supplier Name",type:"text",required:!0},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Purchase Order — PO-[Reference]",required:!0},{id:"po_number",label:"PO Number",type:"text",required:!0},{id:"order_details",label:"Order Details",type:"textarea",required:!0,placeholder:"Item, quantity, unit price, total"},{id:"delivery_address",label:"Delivery Address",type:"textarea"},{id:"required_by",label:"Required By Date",type:"text"},{id:"payment_terms",label:"Payment Terms",type:"text",defaultValue:"30 days net"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{supplier_name}},

Please find below our purchase order (PO Number: **{{po_number}}**) from {{org_name}}.

**Order details:**
{{order_details}}

**Delivery address:**
{{delivery_address}}

**Required by:** {{required_by}}
**Payment terms:** {{payment_terms}}

Please confirm receipt of this order and advise of any queries.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-appointment-confirmation-v2",builderId:"email",name:"Appointment Confirmation",description:"Confirm an appointment with a client or patient",category:"Appointments & Reminders",industries:["Healthcare","Business","General","Hospitality"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"[Name]"},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Appointment Confirmation — [Date]",required:!0},{id:"appointment_type",label:"Appointment Type",type:"text",required:!0,placeholder:"e.g. Consultation, Service, Meeting"},{id:"appointment_date",label:"Date & Time",type:"text",required:!0},{id:"location",label:"Location / Address",type:"textarea"},{id:"duration",label:"Duration",type:"text",placeholder:"e.g. 30 minutes"},{id:"preparation",label:"What to Bring / Prepare",type:"textarea"},{id:"cancellation",label:"Cancellation Policy",type:"textarea",defaultValue:"If you need to cancel or rearrange, please give us at least 24 hours notice."},{id:"contact_phone",label:"Contact Phone",type:"phone"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{recipient_name}},

This email confirms your {{appointment_type}} with {{org_name}}.

**Date & Time:** {{appointment_date}}
**Location:** {{location}}
**Duration:** {{duration}}

**What to bring / prepare:**
{{preparation}}

**Cancellation policy:**
{{cancellation}}

If you have any questions, please call us on {{contact_phone}}.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-appointment-reminder-v2",builderId:"email",name:"Appointment Reminder",description:"Remind a client or patient of an upcoming appointment",category:"Appointments & Reminders",industries:["Healthcare","Business","General"],planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"[Name]"},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Reminder: Your Appointment Tomorrow",required:!0},{id:"appointment_date",label:"Appointment Date & Time",type:"text",required:!0},{id:"location",label:"Location",type:"text"},{id:"contact_phone",label:"Contact Phone",type:"phone"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{recipient_name}},

This is a friendly reminder of your upcoming appointment with {{org_name}}.

**Date & Time:** {{appointment_date}}
**Location:** {{location}}

If you need to cancel or rearrange, please contact us as soon as possible on {{contact_phone}}.

We look forward to seeing you.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-overdue-payment-first",builderId:"email",name:"Overdue Payment — First Reminder",description:"Polite first reminder for an overdue invoice",category:"Overdue & Debt",industries:["Finance","Business","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"[Name]"},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Friendly Reminder — Invoice [Invoice Number] Overdue",required:!0},{id:"invoice_number",label:"Invoice Number",type:"text",required:!0},{id:"amount_due",label:"Amount Due (£)",type:"text",required:!0},{id:"due_date",label:"Original Due Date",type:"text",required:!0},{id:"payment_details",label:"Payment Details",type:"textarea",placeholder:"Bank name, sort code, account number, reference"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{recipient_name}},

I hope this email finds you well. I am writing to draw your attention to invoice **{{invoice_number}}** for **£{{amount_due}}**, which was due on {{due_date}}.

It appears this may have been overlooked. Could you please arrange payment at your earliest convenience?

**Payment details:**
{{payment_details}}

If payment has already been made, please disregard this email and accept our thanks. If you have any queries, please do not hesitate to get in touch.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-overdue-payment-final",builderId:"email",name:"Overdue Payment — Final Notice",description:"Final notice before escalating an overdue invoice",category:"Overdue & Debt",industries:["Finance","Business","Legal"],planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#dc2626",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"recipient_name",label:"Recipient Name",type:"text",defaultValue:"[Name]"},{id:"subject",label:"Email Subject",type:"text",defaultValue:"FINAL NOTICE — Invoice [Invoice Number]",required:!0},{id:"invoice_number",label:"Invoice Number",type:"text",required:!0},{id:"amount_due",label:"Amount Due (£)",type:"text",required:!0},{id:"due_date",label:"Original Due Date",type:"text",required:!0},{id:"payment_deadline",label:"Final Payment Deadline",type:"text",required:!0},{id:"payment_details",label:"Payment Details",type:"textarea"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{recipient_name}},

Despite previous reminders, invoice **{{invoice_number}}** for **£{{amount_due}}** (due {{due_date}}) remains unpaid.

**This is our final notice.** Unless payment is received by **{{payment_deadline}}**, we will have no alternative but to escalate this matter, which may include referral to a debt recovery agency or legal proceedings.

**Payment details:**
{{payment_details}}

To avoid further action, please make payment immediately or contact us to discuss a payment arrangement.

Yours faithfully,

{{sender_name}}
{{org_name}}`},{id:"email-it-system-maintenance",builderId:"email",name:"System Maintenance Notice",description:"Notify users of planned system downtime or maintenance",category:"IT & Technical",industries:["IT","Business","General"],planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#0891b2",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Planned System Maintenance — [Date]",required:!0},{id:"system_name",label:"System / Service Name",type:"text",required:!0},{id:"maintenance_date",label:"Maintenance Date & Time",type:"text",required:!0},{id:"duration",label:"Expected Duration",type:"text",required:!0},{id:"impact",label:"Impact on Users",type:"textarea",required:!0},{id:"reason",label:"Reason for Maintenance",type:"textarea"},{id:"contact",label:"Contact for Queries",type:"text"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear Team,

Please be advised that **{{system_name}}** will be undergoing planned maintenance.

**Date & Time:** {{maintenance_date}}
**Expected Duration:** {{duration}}

**Impact:**
{{impact}}

**Reason:**
{{reason}}

We apologise for any inconvenience. For queries, please contact {{contact}}.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-property-viewing-confirmation",builderId:"email",name:"Property Viewing Confirmation",description:"Confirm a property viewing appointment",category:"Property",industries:["Property","Business"],planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Agency / Landlord Name",type:"text",required:!0},{id:"recipient_name",label:"Applicant Name",type:"text",defaultValue:"[Name]"},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Property Viewing Confirmation",required:!0},{id:"property_address",label:"Property Address",type:"textarea",required:!0},{id:"viewing_date",label:"Viewing Date & Time",type:"text",required:!0},{id:"agent_name",label:"Agent / Contact Name",type:"text"},{id:"agent_phone",label:"Agent Phone",type:"phone"},{id:"parking",label:"Parking / Access Notes",type:"textarea"},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{recipient_name}},

Thank you for your interest in the property at {{property_address}}.

We are pleased to confirm your viewing:

**Date & Time:** {{viewing_date}}
**Address:** {{property_address}}
**Agent:** {{agent_name}} — {{agent_phone}}

**Access / Parking:**
{{parking}}

Please contact us if you need to rearrange. We look forward to seeing you.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-healthcare-referral",builderId:"email",name:"Patient Referral Email",description:"Refer a patient to a specialist or service",category:"Healthcare",industries:["Healthcare","General"],planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#0891b2",fields:[{id:"org_name",label:"Referring Organisation",type:"text",required:!0},{id:"recipient_name",label:"Recipient / Specialist Name",type:"text",required:!0},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Patient Referral — [Patient Name]",required:!0},{id:"patient_name",label:"Patient Name",type:"text",required:!0},{id:"patient_dob",label:"Patient Date of Birth",type:"text"},{id:"reason",label:"Reason for Referral",type:"textarea",required:!0},{id:"clinical_notes",label:"Relevant Clinical Notes",type:"textarea"},{id:"urgency",label:"Urgency",type:"select",options:["Routine","Urgent","2-Week Wait","Emergency"]},{id:"sender_name",label:"Referring Clinician",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{recipient_name}},

I am writing to refer the following patient for your assessment.

**Patient:** {{patient_name}}
**Date of Birth:** {{patient_dob}}
**Urgency:** {{urgency}}

**Reason for referral:**
{{reason}}

**Clinical notes:**
{{clinical_notes}}

Please do not hesitate to contact me if you require further information.

Kind regards,

{{sender_name}}
{{org_name}}`},{id:"email-sales-proposal",builderId:"email",name:"Sales Proposal Email",description:"Send a sales proposal or quote to a prospect",category:"Sales & Marketing",industries:["Business","Retail","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#7c3aed",fields:[{id:"org_name",label:"Your Organisation",type:"text",required:!0},{id:"prospect_name",label:"Prospect Name",type:"text",defaultValue:"[Name]"},{id:"subject",label:"Email Subject",type:"text",defaultValue:"Proposal from [Your Organisation]",required:!0},{id:"solution",label:"Solution / Offering",type:"textarea",required:!0},{id:"benefits",label:"Key Benefits",type:"textarea"},{id:"pricing",label:"Pricing / Investment",type:"textarea"},{id:"next_step",label:"Proposed Next Step",type:"text",defaultValue:"I would welcome a call to discuss this further."},{id:"sender_name",label:"Sender Name",type:"text"}],bodyTemplate:`Subject: {{subject}}

Dear {{prospect_name}},

Thank you for your time. Following our recent conversation, I am pleased to share our proposal.

**Our solution:**
{{solution}}

**Key benefits:**
{{benefits}}

**Investment:**
{{pricing}}

**Next step:** {{next_step}}

Please find our full proposal attached. I look forward to hearing from you.

Kind regards,

{{sender_name}}
{{org_name}}`}],i=[{id:"invoice-standard",builderId:"invoice",name:"Standard Invoice",description:"Clean standard invoice for goods or services",category:"Standard Invoice",planRequired:"free",status:"active",popular:!0,supportsBranding:!0,accentColor:"#b45309",fields:[{id:"seller_name",label:"Your Name / Business",type:"text",required:!0},{id:"seller_address",label:"Your Address",type:"textarea"},{id:"seller_email",label:"Your Email",type:"email"},{id:"seller_phone",label:"Your Phone",type:"phone"},{id:"invoice_number",label:"Invoice Number",type:"text",required:!0,placeholder:"e.g. INV-2026-001"},{id:"invoice_date",label:"Invoice Date",type:"date",required:!0},{id:"due_date",label:"Payment Due Date",type:"date",required:!0},{id:"client_name",label:"Client Name",type:"text",required:!0},{id:"client_address",label:"Client Address",type:"textarea"},{id:"client_email",label:"Client Email",type:"email"},{id:"description",label:"Description of Services / Goods",type:"textarea",required:!0},{id:"subtotal",label:"Subtotal",type:"text",required:!0,placeholder:"e.g. £1,200.00"},{id:"vat_rate",label:"VAT Rate",type:"select",options:["0%","5%","20%","N/A"],defaultValue:"20%"},{id:"vat_amount",label:"VAT Amount",type:"text",placeholder:"e.g. £240.00"},{id:"total",label:"Total Amount Due",type:"text",required:!0,placeholder:"e.g. £1,440.00"},{id:"payment_terms",label:"Payment Terms",type:"text",defaultValue:"Payment due within 30 days of invoice date"},{id:"bank_details",label:"Bank / Payment Details",type:"textarea",placeholder:"Bank name, sort code, account number, reference"},{id:"notes",label:"Notes (optional)",type:"textarea"}],bodyTemplate:`# INVOICE

**{{seller_name}}**
{{seller_address}}
{{seller_email}} | {{seller_phone}}

---

**Invoice Number:** {{invoice_number}}
**Invoice Date:** {{invoice_date}}
**Due Date:** {{due_date}}

---

**Bill To:**
{{client_name}}
{{client_address}}
{{client_email}}

---

## Description

{{description}}

---

| | |
|---|---|
| **Subtotal** | {{subtotal}} |
| **VAT ({{vat_rate}})** | {{vat_amount}} |
| **Total Due** | **{{total}}** |

---

**Payment Terms:** {{payment_terms}}

**Payment Details:**
{{bank_details}}

{{notes}}`},{id:"invoice-vat",builderId:"invoice",name:"VAT Invoice",description:"Full VAT invoice compliant with HMRC requirements",category:"VAT Invoice",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"seller_name",label:"Business Name",type:"text",required:!0},{id:"seller_address",label:"Business Address",type:"textarea",required:!0},{id:"seller_vat",label:"VAT Registration Number",type:"text",required:!0,placeholder:"e.g. GB123456789"},{id:"seller_company",label:"Company Number (if Ltd)",type:"text"},{id:"seller_email",label:"Business Email",type:"email"},{id:"invoice_number",label:"Invoice Number",type:"text",required:!0},{id:"invoice_date",label:"Tax Point / Invoice Date",type:"date",required:!0},{id:"due_date",label:"Payment Due Date",type:"date",required:!0},{id:"client_name",label:"Client / Customer Name",type:"text",required:!0},{id:"client_address",label:"Client Address",type:"textarea"},{id:"client_vat",label:"Client VAT Number (if applicable)",type:"text"},{id:"description",label:"Description of Supply",type:"textarea",required:!0},{id:"net_amount",label:"Net Amount (excl. VAT)",type:"text",required:!0},{id:"vat_rate",label:"VAT Rate",type:"select",options:["20% Standard Rate","5% Reduced Rate","0% Zero Rate"],defaultValue:"20% Standard Rate"},{id:"vat_amount",label:"VAT Amount",type:"text",required:!0},{id:"gross_total",label:"Gross Total (incl. VAT)",type:"text",required:!0},{id:"bank_details",label:"Bank Details",type:"textarea",required:!0}],bodyTemplate:`# VAT INVOICE

**{{seller_name}}**
{{seller_address}}
VAT Reg: {{seller_vat}} | Company No: {{seller_company}}
{{seller_email}}

---

**Invoice Number:** {{invoice_number}}
**Tax Point / Date:** {{invoice_date}}
**Payment Due:** {{due_date}}

---

**Customer:**
{{client_name}}
{{client_address}}
Customer VAT No: {{client_vat}}

---

## Supply Details

{{description}}

---

| | |
|---|---|
| **Net Amount** | {{net_amount}} |
| **VAT ({{vat_rate}})** | {{vat_amount}} |
| **Gross Total** | **{{gross_total}}** |

---

**Bank Details:**
{{bank_details}}

*This is a VAT invoice for UK tax purposes.*`},{id:"invoice-proforma",builderId:"invoice",name:"Pro Forma Invoice",description:"Pro forma invoice for advance payment or quotation purposes",category:"Pro Forma",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"seller_name",label:"Your Business Name",type:"text",required:!0},{id:"seller_address",label:"Your Address",type:"textarea"},{id:"seller_email",label:"Your Email",type:"email"},{id:"proforma_number",label:"Pro Forma Number",type:"text",required:!0},{id:"issue_date",label:"Issue Date",type:"date",required:!0},{id:"valid_until",label:"Valid Until",type:"date"},{id:"client_name",label:"Client Name",type:"text",required:!0},{id:"client_address",label:"Client Address",type:"textarea"},{id:"description",label:"Description of Goods / Services",type:"textarea",required:!0},{id:"total",label:"Total Amount",type:"text",required:!0},{id:"payment_instructions",label:"Payment Instructions",type:"textarea"},{id:"notes",label:"Notes",type:"textarea",defaultValue:"This is a pro forma invoice and is not a demand for payment. A formal invoice will be issued upon confirmation of order."}],bodyTemplate:`# PRO FORMA INVOICE

**{{seller_name}}**
{{seller_address}}
{{seller_email}}

---

**Pro Forma Number:** {{proforma_number}}
**Issue Date:** {{issue_date}}
**Valid Until:** {{valid_until}}

---

**Prepared For:**
{{client_name}}
{{client_address}}

---

## Description

{{description}}

---

**Total: {{total}}**

---

**Payment Instructions:**
{{payment_instructions}}

---

*{{notes}}*`},{id:"invoice-credit-note",builderId:"invoice",name:"Credit Note",description:"Issue a credit note against a previous invoice",category:"Credit Note",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"seller_name",label:"Your Business Name",type:"text",required:!0},{id:"seller_address",label:"Your Address",type:"textarea"},{id:"seller_vat",label:"VAT Number (if applicable)",type:"text"},{id:"credit_note_number",label:"Credit Note Number",type:"text",required:!0},{id:"credit_note_date",label:"Credit Note Date",type:"date",required:!0},{id:"original_invoice",label:"Original Invoice Number",type:"text",required:!0},{id:"client_name",label:"Client Name",type:"text",required:!0},{id:"client_address",label:"Client Address",type:"textarea"},{id:"reason",label:"Reason for Credit",type:"textarea",required:!0},{id:"credit_amount",label:"Credit Amount",type:"text",required:!0},{id:"vat_amount",label:"VAT Amount (if applicable)",type:"text"},{id:"total_credit",label:"Total Credit",type:"text",required:!0}],bodyTemplate:`# CREDIT NOTE

**{{seller_name}}**
{{seller_address}}
VAT Reg: {{seller_vat}}

---

**Credit Note Number:** {{credit_note_number}}
**Date:** {{credit_note_date}}
**Against Invoice:** {{original_invoice}}

---

**Issued To:**
{{client_name}}
{{client_address}}

---

## Reason for Credit

{{reason}}

---

| | |
|---|---|
| **Credit Amount (net)** | {{credit_amount}} |
| **VAT** | {{vat_amount}} |
| **Total Credit** | **{{total_credit}}** |

---

*This credit note reduces the amount owed on Invoice {{original_invoice}}.*`},{id:"invoice-quote",builderId:"invoice",name:"Quote / Estimate",description:"Formal quotation or estimate for goods or services",category:"Quote & Estimate",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#b45309",defaultLayout:"quote",fields:[{id:"seller_name",label:"Your Business Name",type:"text",required:!0},{id:"seller_address",label:"Your Address",type:"textarea"},{id:"seller_email",label:"Your Email",type:"email"},{id:"seller_phone",label:"Your Phone",type:"phone"},{id:"quote_number",label:"Quote Number",type:"text",required:!0},{id:"quote_date",label:"Quote Date",type:"date",required:!0},{id:"valid_until",label:"Valid Until",type:"date"},{id:"client_name",label:"Client Name",type:"text",required:!0},{id:"client_address",label:"Client Address",type:"textarea"},{id:"description",label:"Description of Work / Goods",type:"textarea",required:!0},{id:"subtotal",label:"Subtotal",type:"text",required:!0},{id:"vat",label:"VAT (if applicable)",type:"text"},{id:"total",label:"Total",type:"text",required:!0},{id:"terms",label:"Terms & Conditions",type:"textarea",defaultValue:"This quote is valid for 30 days. Prices are subject to change after this date."}],bodyTemplate:`# QUOTATION

**{{seller_name}}**
{{seller_address}}
{{seller_email}} | {{seller_phone}}

---

**Quote Number:** {{quote_number}}
**Date:** {{quote_date}}
**Valid Until:** {{valid_until}}

---

**Prepared For:**
{{client_name}}
{{client_address}}

---

## Scope of Work / Goods

{{description}}

---

| | |
|---|---|
| **Subtotal** | {{subtotal}} |
| **VAT** | {{vat}} |
| **Total** | **{{total}}** |

---

**Terms:**
{{terms}}`},{id:"invoice-deposit",builderId:"invoice",name:"Deposit Invoice",description:"Request a deposit payment before work begins",category:"Deposit",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"seller_name",label:"Your Business Name",type:"text",required:!0},{id:"seller_address",label:"Your Address",type:"textarea"},{id:"seller_email",label:"Your Email",type:"email"},{id:"invoice_number",label:"Invoice Number",type:"text",required:!0},{id:"invoice_date",label:"Invoice Date",type:"date",required:!0},{id:"due_date",label:"Deposit Due Date",type:"date",required:!0},{id:"client_name",label:"Client Name",type:"text",required:!0},{id:"client_address",label:"Client Address",type:"textarea"},{id:"project_description",label:"Project Description",type:"textarea",required:!0},{id:"total_project_value",label:"Total Project Value",type:"text",required:!0},{id:"deposit_percentage",label:"Deposit Percentage",type:"text",defaultValue:"50%"},{id:"deposit_amount",label:"Deposit Amount Due",type:"text",required:!0},{id:"bank_details",label:"Bank Details",type:"textarea",required:!0},{id:"balance_due",label:"Balance Due On Completion",type:"text"}],bodyTemplate:`# DEPOSIT INVOICE

**{{seller_name}}**
{{seller_address}}
{{seller_email}}

---

**Invoice Number:** {{invoice_number}}
**Date:** {{invoice_date}}
**Deposit Due:** {{due_date}}

---

**Client:**
{{client_name}}
{{client_address}}

---

## Project

{{project_description}}

---

| | |
|---|---|
| **Total Project Value** | {{total_project_value}} |
| **Deposit Required ({{deposit_percentage}})** | **{{deposit_amount}}** |
| **Balance Due on Completion** | {{balance_due}} |

---

**Bank Details:**
{{bank_details}}

*Work will commence upon receipt of the deposit.*`},{id:"invoice-receipt",builderId:"invoice",name:"Payment Receipt",description:"Confirm receipt of payment from a customer",category:"Receipt",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"seller_name",label:"Your Business Name",type:"text",required:!0},{id:"seller_address",label:"Your Address",type:"textarea"},{id:"receipt_number",label:"Receipt Number",type:"text",required:!0},{id:"receipt_date",label:"Receipt Date",type:"date",required:!0},{id:"client_name",label:"Received From",type:"text",required:!0},{id:"description",label:"Description",type:"textarea",required:!0},{id:"amount_received",label:"Amount Received",type:"text",required:!0},{id:"payment_method",label:"Payment Method",type:"select",options:["Bank Transfer","Cash","Card","Cheque","Direct Debit","PayPal"],defaultValue:"Bank Transfer"},{id:"invoice_ref",label:"Invoice Reference (if any)",type:"text"}],bodyTemplate:`# PAYMENT RECEIPT

**{{seller_name}}**
{{seller_address}}

---

**Receipt Number:** {{receipt_number}}
**Date:** {{receipt_date}}

---

**Received From:** {{client_name}}
**Invoice Reference:** {{invoice_ref}}

---

## Payment Details

{{description}}

---

| | |
|---|---|
| **Amount Received** | **{{amount_received}}** |
| **Payment Method** | {{payment_method}} |

---

*Thank you for your payment. This receipt confirms that payment has been received in full.*`},{id:"invoice-recurring",builderId:"invoice",name:"Recurring Invoice",description:"Monthly or periodic recurring service invoice",category:"Recurring",planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"seller_name",label:"Your Business Name",type:"text",required:!0},{id:"seller_address",label:"Your Address",type:"textarea"},{id:"seller_email",label:"Your Email",type:"email"},{id:"invoice_number",label:"Invoice Number",type:"text",required:!0},{id:"billing_period",label:"Billing Period",type:"text",required:!0,placeholder:"e.g. June 2026"},{id:"invoice_date",label:"Invoice Date",type:"date",required:!0},{id:"due_date",label:"Due Date",type:"date",required:!0},{id:"client_name",label:"Client Name",type:"text",required:!0},{id:"client_address",label:"Client Address",type:"textarea"},{id:"service_description",label:"Service Description",type:"textarea",required:!0},{id:"monthly_fee",label:"Monthly Fee",type:"text",required:!0},{id:"vat",label:"VAT (if applicable)",type:"text"},{id:"total",label:"Total Due",type:"text",required:!0},{id:"bank_details",label:"Bank Details",type:"textarea",required:!0},{id:"direct_debit_note",label:"Direct Debit Note (optional)",type:"text"}],bodyTemplate:`# RECURRING INVOICE

**{{seller_name}}**
{{seller_address}}
{{seller_email}}

---

**Invoice Number:** {{invoice_number}}
**Billing Period:** {{billing_period}}
**Invoice Date:** {{invoice_date}}
**Due Date:** {{due_date}}

---

**Client:**
{{client_name}}
{{client_address}}

---

## Service

{{service_description}}

---

| | |
|---|---|
| **Monthly Fee** | {{monthly_fee}} |
| **VAT** | {{vat}} |
| **Total Due** | **{{total}}** |

---

**Bank Details:**
{{bank_details}}

{{direct_debit_note}}`},{id:"invoice-statement",builderId:"invoice",name:"Account Statement",description:"Summary statement of all invoices and payments for an account",category:"Statement",industries:["Finance","Business","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"seller_name",label:"Your Business Name",type:"text",required:!0},{id:"seller_address",label:"Your Address",type:"textarea"},{id:"seller_email",label:"Your Email",type:"email"},{id:"client_name",label:"Client Name",type:"text",required:!0},{id:"client_address",label:"Client Address",type:"textarea"},{id:"statement_date",label:"Statement Date",type:"date",required:!0},{id:"account_ref",label:"Account Reference",type:"text"},{id:"period",label:"Statement Period",type:"text",placeholder:"e.g. 1 May 2026 – 31 May 2026"},{id:"transactions",label:"Transactions",type:"textarea",required:!0,placeholder:"Date | Description | Debit | Credit | Balance"},{id:"balance_due",label:"Balance Due (£)",type:"text",required:!0},{id:"payment_details",label:"Payment Details",type:"textarea"}],bodyTemplate:`**ACCOUNT STATEMENT**

**{{seller_name}}**
{{seller_address}}
{{seller_email}}

---

**Statement for:** {{client_name}}
{{client_address}}

**Statement Date:** {{statement_date}}
**Account Ref:** {{account_ref}}
**Period:** {{period}}

---

## Transactions

{{transactions}}

---

**Balance Due: £{{balance_due}}**

**Payment Details:**
{{payment_details}}`},{id:"invoice-payment-request",builderId:"invoice",name:"Payment Request",description:"Simple payment request for services rendered or goods supplied",category:"Payment Request",industries:["Finance","Business","General"],planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"seller_name",label:"Your Name / Business",type:"text",required:!0},{id:"seller_address",label:"Your Address",type:"textarea"},{id:"seller_email",label:"Your Email",type:"email"},{id:"client_name",label:"Client Name",type:"text",required:!0},{id:"request_date",label:"Request Date",type:"date",required:!0},{id:"reference",label:"Reference",type:"text"},{id:"description",label:"Description of Work / Goods",type:"textarea",required:!0},{id:"amount",label:"Amount Requested (£)",type:"text",required:!0},{id:"due_date",label:"Payment Due Date",type:"date"},{id:"payment_details",label:"Payment Details",type:"textarea",required:!0}],bodyTemplate:`**PAYMENT REQUEST**

**From:** {{seller_name}}
{{seller_address}}
{{seller_email}}

**To:** {{client_name}}

**Date:** {{request_date}}
**Reference:** {{reference}}

---

**Description:**
{{description}}

---

**Amount Requested: £{{amount}}**
**Due Date:** {{due_date}}

**Payment Details:**
{{payment_details}}

Thank you for your prompt payment.`},{id:"invoice-retainer",builderId:"invoice",name:"Retainer Invoice",description:"Monthly retainer invoice for ongoing services",category:"Retainer",industries:["Business","Finance","IT","Legal"],planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"seller_name",label:"Your Business Name",type:"text",required:!0},{id:"seller_address",label:"Your Address",type:"textarea"},{id:"seller_email",label:"Your Email",type:"email"},{id:"client_name",label:"Client Name",type:"text",required:!0},{id:"client_address",label:"Client Address",type:"textarea"},{id:"invoice_number",label:"Invoice Number",type:"text",required:!0},{id:"invoice_date",label:"Invoice Date",type:"date",required:!0},{id:"retainer_period",label:"Retainer Period",type:"text",placeholder:"e.g. June 2026"},{id:"services_included",label:"Services Included",type:"textarea",required:!0},{id:"hours_included",label:"Hours Included",type:"text",placeholder:"e.g. Up to 10 hours"},{id:"retainer_fee",label:"Retainer Fee (£)",type:"text",required:!0},{id:"vat_amount",label:"VAT (£)",type:"text"},{id:"total",label:"Total (£)",type:"text",required:!0},{id:"due_date",label:"Payment Due Date",type:"date"},{id:"bank_details",label:"Bank Details",type:"textarea"}],bodyTemplate:`**RETAINER INVOICE**

**{{seller_name}}**
{{seller_address}}
{{seller_email}}

---

**Invoice To:** {{client_name}}
{{client_address}}

**Invoice Number:** {{invoice_number}}
**Invoice Date:** {{invoice_date}}
**Retainer Period:** {{retainer_period}}
**Due Date:** {{due_date}}

---

## Services Included

{{services_included}}

**Hours included:** {{hours_included}}

---

| | |
|---|---|
| **Retainer Fee** | £{{retainer_fee}} |
| **VAT** | £{{vat_amount}} |
| **Total Due** | **£{{total}}** |

---

**Bank Details:**
{{bank_details}}`},{id:"invoice-non-vat",builderId:"invoice",name:"Non-VAT Invoice",description:"Invoice for businesses not VAT registered",category:"Non-VAT Invoice",industries:["Business","Finance","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#b45309",fields:[{id:"seller_name",label:"Your Business Name",type:"text",required:!0},{id:"seller_address",label:"Your Address",type:"textarea"},{id:"seller_email",label:"Your Email",type:"email"},{id:"client_name",label:"Client Name",type:"text",required:!0},{id:"client_address",label:"Client Address",type:"textarea"},{id:"invoice_number",label:"Invoice Number",type:"text",required:!0},{id:"invoice_date",label:"Invoice Date",type:"date",required:!0},{id:"due_date",label:"Payment Due Date",type:"date"},{id:"line_items",label:"Line Items",type:"textarea",required:!0,placeholder:"Description | Qty | Unit Price | Total"},{id:"subtotal",label:"Subtotal (£)",type:"text",required:!0},{id:"total",label:"Total (£)",type:"text",required:!0},{id:"bank_details",label:"Bank Details",type:"textarea"},{id:"notes",label:"Notes",type:"textarea",defaultValue:"VAT is not applicable as we are not VAT registered."}],bodyTemplate:`**INVOICE**

**{{seller_name}}**
{{seller_address}}
{{seller_email}}

---

**Invoice To:** {{client_name}}
{{client_address}}

**Invoice Number:** {{invoice_number}}
**Date:** {{invoice_date}}
**Due Date:** {{due_date}}

---

## Items

{{line_items}}

---

| | |
|---|---|
| **Subtotal** | £{{subtotal}} |
| **Total** | **£{{total}}** |

*{{notes}}*

---

**Bank Details:**
{{bank_details}}`}],e="#dc2626",r=[{id:"contract-service-agreement",builderId:"contract",name:"Service Agreement",description:"General services agreement between a provider and client",category:"Service Agreement",industries:["Business","Consulting","Professional Services"],planRequired:"free",status:"active",popular:!0,supportsBranding:!0,showDocHeader:!0,accentColor:e,fields:[{id:"provider_name",label:"Service Provider Name",type:"text",placeholder:"Your business name",required:!0},{id:"provider_address",label:"Provider Address",type:"textarea",placeholder:"Full registered or trading address",required:!0},{id:"client_name",label:"Client Name",type:"text",placeholder:"Client or company name",required:!0},{id:"client_address",label:"Client Address",type:"textarea",placeholder:"Full registered or trading address",required:!0},{id:"services_description",label:"Services Description",type:"textarea",placeholder:"Describe the services to be provided in detail",required:!0},{id:"start_date",label:"Start Date",type:"date",required:!0},{id:"end_date",label:"End Date / Duration",type:"text",placeholder:"e.g. 31 December 2026 or ongoing"},{id:"fee_amount",label:"Fee / Rate",type:"text",placeholder:"e.g. GBP 1,500 per month or GBP 75 per hour",required:!0},{id:"payment_terms",label:"Payment Terms",type:"text",placeholder:"e.g. 30 days from invoice date",defaultValue:"30 days from invoice date"},{id:"expenses_policy",label:"Expenses Policy",type:"textarea",defaultValue:"Reasonable expenses must be approved by the Client in advance and supported by receipts."},{id:"notice_period",label:"Notice Period",type:"text",placeholder:"e.g. 30 days written notice",defaultValue:"30 days written notice"},{id:"governing_law",label:"Governing Law",type:"text",placeholder:"e.g. England and Wales",defaultValue:"England and Wales"},{id:"additional_terms",label:"Additional Terms",type:"textarea",placeholder:"Any additional terms or special conditions"},{id:"provider_signatory",label:"Provider Signatory Name",type:"text",placeholder:"Name of person signing"},{id:"provider_title",label:"Provider Signatory Title",type:"text",placeholder:"e.g. Director"},{id:"client_signatory",label:"Client Signatory Name",type:"text",placeholder:"Name of person signing for the client"},{id:"signatory_date",label:"Date of Signing",type:"date"}],bodyTemplate:`# SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of {{start_date}} between:

**{{provider_name}}** of {{provider_address}} ("Service Provider")

and

**{{client_name}}** of {{client_address}} ("Client").

---

## 1. Services

The Service Provider agrees to provide the following services to the Client:

{{services_description}}

## 2. Term

This Agreement starts on {{start_date}} and continues until {{end_date}}, unless terminated earlier under this Agreement.

## 3. Fees and Payment

The Client agrees to pay the Service Provider {{fee_amount}}.

Payment terms: {{payment_terms}}.

Invoices not paid when due may attract interest at 8% above the Bank of England base rate under the Late Payment of Commercial Debts (Interest) Act 1998.

## 4. Expenses

{{expenses_policy}}

## 5. Confidentiality

Each party must keep confidential all information received from the other party that is marked confidential or would reasonably be understood to be confidential.

## 6. Intellectual Property

Unless otherwise agreed in writing, intellectual property created specifically for the Client under this Agreement transfers to the Client only after the Service Provider has received full payment of all related fees.

## 7. Limitation of Liability

The Service Provider's total liability under this Agreement shall not exceed the total fees paid by the Client in the three months before the claim arose. Nothing in this Agreement limits liability that cannot legally be limited.

## 8. Termination

Either party may terminate this Agreement by giving {{notice_period}} to the other party. Either party may terminate immediately if the other party commits a material breach and fails to remedy it within a reasonable period after written notice.

## 9. Governing Law

This Agreement is governed by and construed in accordance with the laws of {{governing_law}}.

{{additional_terms}}

---

**Signed for and on behalf of {{provider_name}}**

Name: {{provider_signatory}}

Title: {{provider_title}}

Date: {{signatory_date}}

---

**Signed for and on behalf of {{client_name}}**

Name: {{client_signatory}}

Date: {{signatory_date}}
`}],n=[{id:"policy-privacy",builderId:"policy",name:"Privacy Policy",description:"GDPR-compliant privacy policy for websites and businesses",category:"Privacy & Data",planRequired:"free",status:"active",popular:!0,supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation / Business Name",type:"text",required:!0},{id:"org_address",label:"Registered Address",type:"textarea",required:!0},{id:"website_url",label:"Website URL",type:"text",placeholder:"https://www.example.com"},{id:"contact_email",label:"Privacy Contact Email",type:"email",required:!0},{id:"data_types",label:"Types of Data Collected",type:"textarea",placeholder:"e.g. Name, email address, phone number, payment information",defaultValue:"Name, email address, phone number, IP address, cookies and usage data"},{id:"data_purposes",label:"Purposes of Processing",type:"textarea",defaultValue:"To provide our services, process payments, send marketing communications (with consent), improve our website, and comply with legal obligations"},{id:"retention_period",label:"Data Retention Period",type:"text",defaultValue:"7 years for financial records; 3 years for marketing data; 1 year for website analytics"},{id:"third_parties",label:"Third Parties Data is Shared With",type:"textarea",defaultValue:"Payment processors, email marketing platforms, cloud hosting providers, analytics services"},{id:"dpo_name",label:"Data Protection Officer (if applicable)",type:"text",placeholder:'Name or "Not applicable"'},{id:"last_updated",label:"Last Updated Date",type:"date",required:!0}],bodyTemplate:`# PRIVACY POLICY

**{{org_name}}** is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your information.

**Last updated:** {{last_updated}}

---

## 1. Who We Are

**{{org_name}}**
{{org_address}}
{{website_url}}

Contact: {{contact_email}}

{{dpo_name}}

## 2. What Data We Collect

We may collect and process the following personal data:

{{data_types}}

## 3. How We Use Your Data

We use your personal data for the following purposes:

{{data_purposes}}

## 4. Legal Basis for Processing

We process your personal data on the following legal bases under UK GDPR:
- **Contract performance** — to fulfil our contractual obligations to you
- **Legitimate interests** — to improve our services and prevent fraud
- **Legal obligation** — to comply with applicable laws
- **Consent** — where you have given explicit consent (e.g. marketing emails)

## 5. Data Retention

We retain your personal data for the following periods:

{{retention_period}}

After these periods, data is securely deleted or anonymised.

## 6. Sharing Your Data

We may share your data with:

{{third_parties}}

We do not sell your personal data to third parties.

## 7. Your Rights

Under UK GDPR, you have the right to:
- **Access** your personal data
- **Rectify** inaccurate data
- **Erase** your data ("right to be forgotten")
- **Restrict** processing
- **Data portability**
- **Object** to processing
- **Withdraw consent** at any time

To exercise any of these rights, contact us at {{contact_email}}.

## 8. Cookies

We use cookies to improve your experience on our website. You can control cookies through your browser settings. For more information, see our Cookie Policy.

## 9. Security

We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or destruction.

## 10. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice on our website.

## 11. Complaints

If you have concerns about how we handle your data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at www.ico.org.uk.`},{id:"policy-cookie",builderId:"policy",name:"Cookie Policy",description:"Cookie policy for websites explaining cookie usage",category:"Website Policies",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"website_url",label:"Website URL",type:"text",required:!0},{id:"contact_email",label:"Contact Email",type:"email",required:!0},{id:"analytics_tool",label:"Analytics Tool Used",type:"text",placeholder:"e.g. Google Analytics",defaultValue:"Google Analytics"},{id:"last_updated",label:"Last Updated",type:"date",required:!0}],bodyTemplate:`# COOKIE POLICY

**{{org_name}}** | {{website_url}}

**Last updated:** {{last_updated}}

---

## What Are Cookies?

Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences and improve your experience.

## How We Use Cookies

We use the following types of cookies on {{website_url}}:

### Essential Cookies
These cookies are necessary for the website to function and cannot be disabled. They are usually set in response to actions you take, such as logging in or filling in forms.

### Analytics Cookies
We use **{{analytics_tool}}** to understand how visitors interact with our website. These cookies collect information anonymously, including the number of visitors, where visitors came from, and the pages they visited.

### Preference Cookies
These cookies allow our website to remember choices you make (such as your language or region) and provide enhanced, personalised features.

### Marketing Cookies
We may use marketing cookies to track visitors across websites and display relevant advertisements. These are only set with your consent.

## Managing Cookies

You can control and manage cookies in several ways:

- **Browser settings** — Most browsers allow you to refuse or delete cookies. See your browser's help documentation for instructions.
- **Cookie consent tool** — When you first visit our website, you can choose which non-essential cookies to accept.
- **Opt-out tools** — For analytics cookies, you can opt out via {{analytics_tool}}'s opt-out tools.

Please note that disabling certain cookies may affect the functionality of our website.

## Contact

If you have questions about our use of cookies, contact us at {{contact_email}}.`},{id:"policy-complaints",builderId:"policy",name:"Complaints Policy",description:"Formal complaints handling policy for businesses",category:"Complaints",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"complaints_contact",label:"Complaints Contact Name / Role",type:"text",required:!0},{id:"complaints_email",label:"Complaints Email",type:"email",required:!0},{id:"complaints_phone",label:"Complaints Phone",type:"phone"},{id:"response_time",label:"Initial Response Time",type:"text",defaultValue:"5 working days"},{id:"resolution_time",label:"Resolution Time",type:"text",defaultValue:"28 working days"},{id:"escalation_body",label:"External Escalation Body",type:"text",placeholder:"e.g. Ombudsman, regulator name"},{id:"last_updated",label:"Last Updated",type:"date",required:!0}],bodyTemplate:`# COMPLAINTS POLICY

**{{org_name}}**

**Last updated:** {{last_updated}}

---

## Our Commitment

{{org_name}} is committed to providing a high-quality service. We take all complaints seriously and aim to resolve them fairly, consistently, and promptly.

## How to Make a Complaint

You can make a complaint by:

- **Email:** {{complaints_email}}
- **Phone:** {{complaints_phone}}
- **In writing to:** {{complaints_contact}}, {{org_name}}

Please provide: your name and contact details, a clear description of your complaint, any relevant dates or reference numbers, and what outcome you are seeking.

## How We Handle Complaints

### Stage 1 — Initial Response
We will acknowledge your complaint within **{{response_time}}** of receiving it.

### Stage 2 — Investigation
We will investigate your complaint thoroughly and aim to provide a full response within **{{resolution_time}}**.

### Stage 3 — Final Response
If you are not satisfied with our response, you may request a review by a senior manager. We will provide a final response within 14 working days of your request.

## Escalation

If you remain dissatisfied after exhausting our internal complaints process, you may refer your complaint to:

**{{escalation_body}}**

## Learning from Complaints

We use complaints to improve our services. All complaints are recorded and reviewed regularly by management.

## Confidentiality

All complaints are handled in confidence. Information will only be shared with those who need it to investigate and resolve your complaint.`},{id:"policy-refund",builderId:"policy",name:"Refund Policy",description:"Refund and returns policy for businesses",category:"Finance",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Business Name",type:"text",required:!0},{id:"product_type",label:"Type of Products / Services",type:"select",options:["Physical goods","Digital products","Services","Mixed (goods and services)"],defaultValue:"Services"},{id:"refund_window",label:"Refund Window",type:"text",defaultValue:"14 days from purchase"},{id:"refund_conditions",label:"Conditions for Refund",type:"textarea",defaultValue:"Items must be unused and in original condition. Digital products are non-refundable once downloaded. Services are non-refundable once commenced unless there is a fault on our part."},{id:"refund_process",label:"How to Request a Refund",type:"textarea",defaultValue:"Contact us by email with your order number and reason for the refund request. We will respond within 5 working days."},{id:"contact_email",label:"Contact Email",type:"email",required:!0},{id:"last_updated",label:"Last Updated",type:"date",required:!0}],bodyTemplate:`# REFUND POLICY

**{{org_name}}**

**Last updated:** {{last_updated}}

---

## Overview

This policy covers refunds for {{product_type}} sold by {{org_name}}.

## Refund Window

You may request a refund within **{{refund_window}}** of your purchase.

## Conditions

{{refund_conditions}}

## Statutory Rights

Nothing in this policy affects your statutory rights under the Consumer Rights Act 2015 or the Consumer Contracts Regulations 2013. If you are a consumer, you have the right to cancel most purchases within 14 days without giving a reason.

## How to Request a Refund

{{refund_process}}

Contact: {{contact_email}}

## Processing Time

Approved refunds will be processed within 10 working days and returned to your original payment method.

## Faulty or Incorrect Items

If you receive a faulty or incorrect item, please contact us immediately. We will arrange a replacement or full refund at no cost to you.`},{id:"policy-health-safety",builderId:"policy",name:"Health & Safety Policy",description:"Workplace health and safety policy statement",category:"Health & Safety",planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"responsible_person",label:"Person Responsible for H&S",type:"text",required:!0},{id:"responsible_title",label:"Their Title / Role",type:"text",required:!0},{id:"business_activities",label:"Main Business Activities",type:"textarea",required:!0},{id:"key_hazards",label:"Key Hazards / Risks",type:"textarea",placeholder:"List the main hazards in your workplace"},{id:"emergency_procedures",label:"Emergency Procedures",type:"textarea",defaultValue:"In the event of an emergency, all staff must follow the evacuation procedure. Fire exits are clearly marked. First aid kits are located at reception and in the staff room."},{id:"review_date",label:"Policy Review Date",type:"date",required:!0},{id:"signatory_name",label:"Signed By",type:"text"},{id:"signatory_title",label:"Title",type:"text"},{id:"signatory_date",label:"Date",type:"date"}],bodyTemplate:`# HEALTH AND SAFETY POLICY

**{{org_name}}**

---

## Statement of Intent

{{org_name}} is committed to ensuring the health, safety, and welfare of all employees, contractors, visitors, and anyone else who may be affected by our activities.

We will, so far as is reasonably practicable:
- Provide and maintain safe working conditions, equipment, and systems of work
- Ensure safe use, handling, storage, and transport of articles and substances
- Provide information, instruction, training, and supervision
- Maintain safe and healthy working conditions
- Review and revise this policy as necessary

## Responsibilities

**Overall responsibility for health and safety rests with:**

{{responsible_person}}, {{responsible_title}}

All managers and supervisors are responsible for implementing this policy in their areas. All employees are responsible for cooperating with management on health and safety matters and for taking reasonable care of their own and others' safety.

## Our Business Activities

{{business_activities}}

## Key Hazards and Controls

{{key_hazards}}

## Emergency Procedures

{{emergency_procedures}}

## Reporting

All accidents, near misses, and dangerous occurrences must be reported to {{responsible_person}} and recorded in the accident book. Reportable incidents will be reported to the Health and Safety Executive (HSE) under RIDDOR.

## Review

This policy will be reviewed annually or following any significant change in our activities.

**Next review date:** {{review_date}}`},{id:"policy-safeguarding",builderId:"policy",name:"Safeguarding Policy",description:"Child and adult safeguarding policy for organisations",category:"Safeguarding",planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"org_type",label:"Organisation Type",type:"select",options:["School / Academy","Charity","Sports Club","Community Organisation","Healthcare Provider","Other"],defaultValue:"Charity"},{id:"dsl_name",label:"Designated Safeguarding Lead (DSL)",type:"text",required:!0},{id:"dsl_contact",label:"DSL Contact Details",type:"text",required:!0},{id:"deputy_dsl",label:"Deputy DSL (if applicable)",type:"text"},{id:"scope",label:"Who This Policy Covers",type:"textarea",defaultValue:"This policy applies to all staff, volunteers, trustees, and contractors working with or on behalf of the organisation."},{id:"reporting_procedure",label:"Reporting Procedure",type:"textarea",defaultValue:"Any concerns about a child or vulnerable adult must be reported immediately to the DSL. Do not investigate concerns yourself. Record all concerns in writing."},{id:"review_date",label:"Policy Review Date",type:"date",required:!0},{id:"signatory_name",label:"Approved By",type:"text"},{id:"signatory_title",label:"Title",type:"text"},{id:"signatory_date",label:"Date",type:"date"}],bodyTemplate:`# SAFEGUARDING POLICY

**{{org_name}}** | {{org_type}}

---

## Policy Statement

{{org_name}} is committed to safeguarding and promoting the welfare of children and vulnerable adults. We believe that all children and vulnerable adults have the right to be protected from harm.

## Scope

{{scope}}

## Designated Safeguarding Lead

**{{dsl_name}}**
Contact: {{dsl_contact}}

Deputy DSL: {{deputy_dsl}}

## Our Responsibilities

We will:
- Create and maintain a safe environment for all children and vulnerable adults
- Respond appropriately to all concerns or allegations of abuse
- Ensure all staff and volunteers are appropriately vetted (DBS checked where required)
- Provide safeguarding training to all relevant staff and volunteers
- Work in partnership with statutory agencies when required

## Types of Abuse

Staff should be aware of the following types of abuse: physical abuse, emotional abuse, sexual abuse, neglect, financial abuse, and exploitation.

## Reporting Concerns

{{reporting_procedure}}

If a child or vulnerable adult is in immediate danger, call **999** immediately.

For non-emergency concerns, contact the local authority children's or adult services, or the NSPCC helpline on **0808 800 5000**.

## Confidentiality

Safeguarding concerns are not subject to normal confidentiality rules. Information will be shared with appropriate agencies to protect the individual.

## Review

This policy will be reviewed annually.

**Next review date:** {{review_date}}`},{id:"policy-data-protection",builderId:"policy",name:"Data Protection Policy",description:"Internal data protection policy for staff and operations",category:"Privacy & Data",planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"dpo_name",label:"Data Protection Officer / Lead",type:"text",required:!0},{id:"dpo_email",label:"DPO Email",type:"email",required:!0},{id:"data_systems",label:"Key Data Systems Used",type:"textarea",placeholder:"e.g. CRM, HR system, email platform, cloud storage"},{id:"breach_procedure",label:"Data Breach Procedure",type:"textarea",defaultValue:"Any suspected data breach must be reported to the DPO immediately. The DPO will assess the breach and, if required, notify the ICO within 72 hours."},{id:"review_date",label:"Review Date",type:"date",required:!0},{id:"signatory_name",label:"Approved By",type:"text"},{id:"signatory_date",label:"Date",type:"date"}],bodyTemplate:`# DATA PROTECTION POLICY

**{{org_name}}**

---

## Introduction

{{org_name}} is committed to processing personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.

## Data Protection Principles

We adhere to the following principles. Personal data must be:
1. Processed lawfully, fairly, and transparently
2. Collected for specified, explicit, and legitimate purposes
3. Adequate, relevant, and limited to what is necessary
4. Accurate and kept up to date
5. Retained only as long as necessary
6. Processed securely

## Data Protection Officer

**{{dpo_name}}**
Email: {{dpo_email}}

## Data Systems

{{data_systems}}

## Individual Rights

We will respond to requests from individuals exercising their rights under UK GDPR within one calendar month. Rights include: access, rectification, erasure, restriction, portability, and objection.

## Data Breach Procedure

{{breach_procedure}}

## Staff Responsibilities

All staff who handle personal data must: complete data protection training, follow this policy, report breaches immediately, and not share personal data without authorisation.

## Review

This policy will be reviewed annually or following any significant change.

**Next review date:** {{review_date}}`},{id:"policy-acceptable-use",builderId:"policy",name:"Acceptable Use Policy",description:"IT and internet acceptable use policy for staff",category:"HR Policies",planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"it_contact",label:"IT Contact / Helpdesk",type:"text",required:!0},{id:"monitoring_statement",label:"Monitoring Statement",type:"textarea",defaultValue:"The organisation reserves the right to monitor use of its IT systems and internet access for security and compliance purposes. Users should have no expectation of privacy when using organisation systems."},{id:"prohibited_activities",label:"Prohibited Activities",type:"textarea",defaultValue:"Accessing illegal content, downloading unlicensed software, sharing confidential data without authorisation, using systems for personal commercial gain, sending offensive or harassing communications."},{id:"review_date",label:"Review Date",type:"date",required:!0},{id:"signatory_name",label:"Approved By",type:"text"},{id:"signatory_date",label:"Date",type:"date"}],bodyTemplate:`# ACCEPTABLE USE POLICY

**{{org_name}}**

---

## Purpose

This policy sets out the acceptable use of {{org_name}}'s IT systems, including computers, mobile devices, email, internet access, and cloud services.

## Scope

This policy applies to all employees, contractors, volunteers, and anyone else who uses {{org_name}}'s IT systems.

## Acceptable Use

IT systems are provided for business purposes. Limited personal use is permitted provided it does not interfere with work, consume excessive resources, or breach this policy.

## Prohibited Activities

The following are strictly prohibited:

{{prohibited_activities}}

## Monitoring

{{monitoring_statement}}

## Security

Users must:
- Use strong, unique passwords and not share them
- Lock their screen when leaving their workstation
- Not install unauthorised software
- Report security incidents immediately to {{it_contact}}
- Not connect personal devices to the network without authorisation

## Social Media

Staff must not post content that could damage the organisation's reputation or disclose confidential information.

## Consequences

Breach of this policy may result in disciplinary action, up to and including dismissal.

## Contact

IT queries: {{it_contact}}

**Review date:** {{review_date}}`},{id:"policy-terms-of-service",builderId:"policy",name:"Terms of Service",description:"Website or app terms of service / terms and conditions",category:"Website Policies",planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Company / Organisation Name",type:"text",required:!0},{id:"website_url",label:"Website / App URL",type:"text",required:!0},{id:"contact_email",label:"Contact Email",type:"email",required:!0},{id:"service_description",label:"Description of Service",type:"textarea",required:!0},{id:"user_obligations",label:"User Obligations",type:"textarea",defaultValue:"Users must provide accurate information, not misuse the service, not attempt to gain unauthorised access, and comply with all applicable laws."},{id:"payment_terms",label:"Payment Terms (if applicable)",type:"textarea",placeholder:"Leave blank if free service"},{id:"last_updated",label:"Last Updated",type:"date",required:!0}],bodyTemplate:`# TERMS OF SERVICE

**{{org_name}}** | {{website_url}}

**Last updated:** {{last_updated}}

---

## 1. Acceptance of Terms

By accessing or using {{website_url}}, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service.

## 2. Our Service

{{service_description}}

## 3. User Obligations

{{user_obligations}}

## 4. Account Registration

If you create an account, you are responsible for maintaining the security of your account and for all activities that occur under your account.

## 5. Payment

{{payment_terms}}

## 6. Intellectual Property

All content on {{website_url}}, including text, graphics, logos, and software, is the property of {{org_name}} and is protected by copyright law.

## 7. Limitation of Liability

To the maximum extent permitted by law, {{org_name}} shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.

## 8. Termination

We reserve the right to suspend or terminate your access to the service at any time for breach of these Terms.

## 9. Changes to Terms

We may update these Terms from time to time. Continued use of the service after changes constitutes acceptance of the new Terms.

## 10. Governing Law

These Terms are governed by the laws of England and Wales.

## 11. Contact

{{contact_email}}`},{id:"policy-remote-working",builderId:"policy",name:"Remote Working Policy",description:"Policy governing home and remote working arrangements",category:"Remote Working",industries:["HR","Business","IT","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"effective_date",label:"Effective Date",type:"date",required:!0},{id:"eligibility",label:"Eligibility Criteria",type:"textarea",defaultValue:"Remote working is available to employees whose role is suitable for home working, subject to manager approval."},{id:"approval_process",label:"Approval Process",type:"textarea",defaultValue:"Requests must be submitted in writing to the line manager and approved by HR."},{id:"working_hours",label:"Expected Working Hours",type:"textarea",defaultValue:"Employees are expected to maintain their contracted hours and be contactable during core hours (10am–4pm)."},{id:"equipment",label:"Equipment & Technology",type:"textarea",defaultValue:"The organisation will provide a laptop and necessary software. Employees are responsible for a suitable workspace and internet connection."},{id:"data_security",label:"Data Security Requirements",type:"textarea",defaultValue:"Employees must follow the organisation's data protection policy, use a secure Wi-Fi connection, and lock screens when not in use."},{id:"health_safety",label:"Health & Safety",type:"textarea",defaultValue:"Employees must complete a home workstation self-assessment and report any concerns to their manager."},{id:"expenses",label:"Expenses",type:"textarea",defaultValue:"Reasonable pre-approved expenses for home working (e.g. broadband contribution) may be reimbursed in line with the expenses policy."},{id:"review",label:"Policy Review",type:"text",defaultValue:"This policy will be reviewed annually."},{id:"contact_hr",label:"HR Contact",type:"email"}],bodyTemplate:`# Remote Working Policy

**Organisation:** {{org_name}}
**Effective Date:** {{effective_date}}

---

## 1. Purpose

This policy sets out {{org_name}}'s approach to remote and home working, ensuring that employees can work effectively while maintaining productivity, security, and wellbeing.

## 2. Eligibility

{{eligibility}}

## 3. Approval Process

{{approval_process}}

## 4. Working Hours & Availability

{{working_hours}}

## 5. Equipment & Technology

{{equipment}}

## 6. Data Security

{{data_security}}

## 7. Health & Safety

{{health_safety}}

## 8. Expenses

{{expenses}}

## 9. Review

{{review}}

**Contact:** {{contact_hr}}`},{id:"policy-social-media",builderId:"policy",name:"Social Media Policy",description:"Policy governing employee and organisational use of social media",category:"Social Media",industries:["HR","Business","General"],planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"effective_date",label:"Effective Date",type:"date",required:!0},{id:"scope",label:"Scope",type:"textarea",defaultValue:"This policy applies to all employees, contractors, and volunteers who use social media in a personal or professional capacity in a way that could be associated with the organisation."},{id:"official_accounts",label:"Official Accounts",type:"textarea",defaultValue:"Only authorised staff may post on behalf of the organisation's official social media accounts."},{id:"personal_use",label:"Personal Use Guidelines",type:"textarea",defaultValue:"Employees must not post content that could bring the organisation into disrepute, disclose confidential information, or harass colleagues or clients."},{id:"confidentiality",label:"Confidentiality",type:"textarea",defaultValue:"Do not share confidential business information, client details, or internal matters on any social media platform."},{id:"breaches",label:"Breaches & Consequences",type:"textarea",defaultValue:"Breaches of this policy may result in disciplinary action, up to and including dismissal."},{id:"contact_hr",label:"HR / Policy Contact",type:"email"}],bodyTemplate:`# Social Media Policy

**Organisation:** {{org_name}}
**Effective Date:** {{effective_date}}

---

## 1. Scope

{{scope}}

## 2. Official Social Media Accounts

{{official_accounts}}

## 3. Personal Use of Social Media

{{personal_use}}

## 4. Confidentiality

{{confidentiality}}

## 5. Breaches

{{breaches}}

## 6. Contact

For questions about this policy, contact: {{contact_hr}}`},{id:"policy-whistleblowing",builderId:"policy",name:"Whistleblowing Policy",description:"Policy for reporting wrongdoing or malpractice (Public Interest Disclosure)",category:"Whistleblowing",industries:["HR","Business","Charity","Healthcare","General"],planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"effective_date",label:"Effective Date",type:"date",required:!0},{id:"scope",label:"Scope",type:"textarea",defaultValue:"This policy applies to all employees, contractors, trustees, and volunteers."},{id:"what_to_report",label:"What Can Be Reported",type:"textarea",defaultValue:"Concerns may include: criminal activity, failure to comply with legal obligations, health and safety risks, financial irregularities, or cover-ups of any of the above."},{id:"how_to_report",label:"How to Raise a Concern",type:"textarea",defaultValue:"Concerns should be raised with your line manager, HR, or the designated whistleblowing officer. Reports can be made verbally or in writing."},{id:"whistleblowing_officer",label:"Whistleblowing Officer",type:"text"},{id:"confidentiality",label:"Confidentiality",type:"textarea",defaultValue:"All disclosures will be treated in confidence. The identity of the person raising a concern will be protected wherever possible."},{id:"protection",label:"Protection from Retaliation",type:"textarea",defaultValue:"The organisation will not tolerate any retaliation against individuals who raise concerns in good faith. Any such behaviour will be treated as a disciplinary matter."},{id:"external_bodies",label:"External Reporting Bodies",type:"textarea",defaultValue:"If internal channels are not appropriate, concerns may be reported to relevant external bodies such as the Health and Safety Executive, the Charity Commission, or the Financial Conduct Authority."}],bodyTemplate:`# Whistleblowing Policy

**Organisation:** {{org_name}}
**Effective Date:** {{effective_date}}

---

## 1. Introduction

{{org_name}} is committed to the highest standards of openness, integrity, and accountability. This policy encourages and enables employees and others to raise concerns about malpractice.

## 2. Scope

{{scope}}

## 3. What Can Be Reported

{{what_to_report}}

## 4. How to Raise a Concern

{{how_to_report}}

**Whistleblowing Officer:** {{whistleblowing_officer}}

## 5. Confidentiality

{{confidentiality}}

## 6. Protection from Retaliation

{{protection}}

## 7. External Reporting

{{external_bodies}}

## 8. Governing Law

This policy is made in accordance with the Public Interest Disclosure Act 1998.`},{id:"policy-expenses",builderId:"policy",name:"Expenses Policy",description:"Policy governing employee expense claims and reimbursement",category:"Finance",industries:["Finance","Business","HR","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"effective_date",label:"Effective Date",type:"date",required:!0},{id:"eligible_expenses",label:"Eligible Expenses",type:"textarea",defaultValue:"Travel (economy class / standard rail), accommodation (up to £150/night), meals (up to £30/day), business entertainment (pre-approved only)."},{id:"ineligible",label:"Ineligible Expenses",type:"textarea",defaultValue:"Personal items, alcohol (unless pre-approved entertainment), fines, first-class travel without prior approval."},{id:"approval",label:"Approval Process",type:"textarea",defaultValue:"All expenses must be pre-approved by the line manager. Claims must be submitted within 30 days of the expense being incurred."},{id:"receipts",label:"Receipt Requirements",type:"textarea",defaultValue:"Original receipts or digital copies must be provided for all claims over £10."},{id:"payment",label:"Payment Process",type:"textarea",defaultValue:"Approved claims will be reimbursed via payroll within 30 days of submission."},{id:"contact_finance",label:"Finance Contact",type:"email"}],bodyTemplate:`# Expenses Policy

**Organisation:** {{org_name}}
**Effective Date:** {{effective_date}}

---

## 1. Purpose

This policy sets out the rules for claiming reimbursement of expenses incurred in the course of employment.

## 2. Eligible Expenses

{{eligible_expenses}}

## 3. Ineligible Expenses

{{ineligible}}

## 4. Approval Process

{{approval}}

## 5. Receipts

{{receipts}}

## 6. Payment

{{payment}}

## 7. Contact

Finance queries: {{contact_finance}}`},{id:"policy-equal-opportunities",builderId:"policy",name:"Equal Opportunities Policy",description:"Policy promoting equality, diversity, and inclusion in the workplace",category:"HR Policies",industries:["HR","Business","Charity","General"],popular:!0,planRequired:"personal",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"effective_date",label:"Effective Date",type:"date",required:!0},{id:"commitment",label:"Commitment Statement",type:"textarea",defaultValue:"{{org_name}} is committed to promoting equality of opportunity for all employees and job applicants. We aim to create a working environment free from discrimination, harassment, and victimisation."},{id:"protected_chars",label:"Protected Characteristics",type:"textarea",defaultValue:"We will not discriminate on the grounds of age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, or sexual orientation."},{id:"responsibilities",label:"Responsibilities",type:"textarea",defaultValue:"All managers are responsible for implementing this policy. All employees are responsible for treating colleagues with dignity and respect."},{id:"breaches",label:"Breaches",type:"textarea",defaultValue:"Any breach of this policy will be treated as a disciplinary matter."},{id:"contact_hr",label:"HR Contact",type:"email"}],bodyTemplate:`# Equal Opportunities Policy

**Organisation:** {{org_name}}
**Effective Date:** {{effective_date}}

---

## 1. Commitment

{{commitment}}

## 2. Protected Characteristics

{{protected_chars}}

## 3. Responsibilities

{{responsibilities}}

## 4. Breaches

{{breaches}}

## 5. Legal Framework

This policy is made in accordance with the Equality Act 2010.

## 6. Contact

{{contact_hr}}`},{id:"policy-lone-working",builderId:"policy",name:"Lone Working Policy",description:"Policy for managing the safety of employees working alone",category:"Health & Safety",industries:["HR","Business","Healthcare","Construction","General"],planRequired:"standard",status:"active",supportsBranding:!0,accentColor:"#16a34a",fields:[{id:"org_name",label:"Organisation Name",type:"text",required:!0},{id:"effective_date",label:"Effective Date",type:"date",required:!0},{id:"scope",label:"Scope / Who This Applies To",type:"textarea",defaultValue:"This policy applies to all employees and contractors who work alone, whether at the organisation's premises, at client sites, or in the community."},{id:"risk_assessment",label:"Risk Assessment Requirements",type:"textarea",defaultValue:"A risk assessment must be completed before any lone working activity. Risks must be reviewed regularly and after any incident."},{id:"check_in",label:"Check-in Procedures",type:"textarea",defaultValue:"Lone workers must check in with their manager at the start and end of each lone working period. Agreed check-in intervals must be maintained."},{id:"emergency",label:"Emergency Procedures",type:"textarea",defaultValue:"Lone workers must carry a charged mobile phone at all times. Emergency contact details must be provided before each lone working session."},{id:"prohibited",label:"Prohibited Activities",type:"textarea",defaultValue:"Certain high-risk activities must not be carried out alone. These will be identified in the relevant risk assessment."},{id:"contact_hs",label:"H&S Contact",type:"email"}],bodyTemplate:`# Lone Working Policy

**Organisation:** {{org_name}}
**Effective Date:** {{effective_date}}

---

## 1. Scope

{{scope}}

## 2. Risk Assessment

{{risk_assessment}}

## 3. Check-in Procedures

{{check_in}}

## 4. Emergency Procedures

{{emergency}}

## 5. Prohibited Activities

{{prohibited}}

## 6. Legal Framework

This policy is made in accordance with the Health and Safety at Work Act 1974 and the Management of Health and Safety at Work Regulations 1999.

## 7. Contact

{{contact_hs}}`}];export{r as C,a as E,i as I,t as L,n as P};
