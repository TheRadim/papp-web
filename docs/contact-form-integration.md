# Contact Form Integration

The repository includes:

- `ContactFormService`
- `ContactFormPayload`
- `ContactFormResult`
- development adapter returning an explicit unconfigured response
- API route at `/api/contact`

## Current Behaviour

- Client-side HTML validation is enabled.
- Server-side payload validation is enabled.
- Submission returns HTTP 501 with a message telling users to email `hey@pappmobility.com`.

## Needed Before Launch

- Choose delivery target: email service, CRM, serverless function or CMS form endpoint.
- Add spam protection.
- Confirm privacy acknowledgement wording.
- Add logging and error monitoring if approved.
- Add integration tests for successful delivery.
