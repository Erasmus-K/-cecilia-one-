export type StakeholderBriefingPayload = {
  name: string;
  email: string;
  department: string;
  message: string;
};

const DEPARTMENT_LABELS: Record<string, string> = {
  research: 'Scientific Partner (Hydrology / Ecology)',
  policy: 'Strategic Advisor (Water Diplomacy / Policy)',
  careers: 'Careers & Research Fellowships',
};

const ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? 'bb7e2b1d-31d9-4769-9674-4e1d4edafdcb';

type Web3FormsResponse = {
  success: boolean;
  message?: string;
  body?: { message?: string };
};

export async function submitStakeholderBriefing(
  payload: StakeholderBriefingPayload
): Promise<{ ok: true } | { ok: false; message: string }> {
  const departmentLabel =
    DEPARTMENT_LABELS[payload.department] ?? payload.department;

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: `WNSC Stakeholder Briefing — ${payload.name}`,
      from_name: payload.name,
      name: payload.name,
      email: payload.email,
      replyto: payload.email,
      department: departmentLabel,
      message: payload.message,
    }),
  });

  let data: Web3FormsResponse;
  try {
    data = (await response.json()) as Web3FormsResponse;
  } catch {
    return {
      ok: false,
      message: 'Unable to reach the briefing service. Please try again shortly.',
    };
  }

  if (!response.ok || !data.success) {
    return {
      ok: false,
      message:
        data.message ??
        data.body?.message ??
        'The briefing could not be sent. Please try again or email info@wnscss.org.',
    };
  }

  return { ok: true };
}
