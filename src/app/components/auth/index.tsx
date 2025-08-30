import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import { Box, CssVarsProvider, Input, Stack, styled, Typography } from '@mui/joy';
import Textarea from '@mui/joy/Textarea';
import "../../../css/auth.css";
import { Label } from '@mui/icons-material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';


const StyledTextarea = styled(TextareaAutosize)({
  resize: 'none',
  border: 'none', // remove the native textarea border
  minWidth: 0, // remove the native textarea width
  outline: 0, // remove the native textarea outline
  padding: 0, // remove the native textarea padding
  paddingBlockStart: '1em',
  paddingInlineEnd: `var(--Textarea-paddingInline)`,
  flex: 'auto',
  alignSelf: 'stretch',
  color: 'inherit',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  '&::placeholder': {
    opacity: 0,
    transition: '0.1s ease-out',
  },
  '&:focus::placeholder': {
    opacity: 1,
  },
  // specific to TextareaAutosize, cannot use '&:focus ~ label'
  '&:focus + textarea + label, &:not(:placeholder-shown) + textarea + label': {
    top: '0.5rem',
    fontSize: '0.75rem',
  },
  '&:focus + textarea + label': {
    color: 'var(--Textarea-focusedHighlight)',
  },
});

const StyledLabel = styled('label')(({ theme }) => ({
  position: 'absolute',
  lineHeight: 1,
  top: 'calc((var(--Textarea-minHeight) - 1em) / 2)',
  color: theme.vars.palette.text.tertiary,
  fontWeight: theme.vars.fontWeight.md,
  transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
}));

const InnerTextareaPhoneNumber = React.forwardRef<
  HTMLTextAreaElement,
  React.JSX.IntrinsicElements['textarea']
>(function InnerTextarea(props, ref) {
  const id = React.useId();
  return (
    <React.Fragment>
      <StyledTextarea minRows={1} {...props} ref={ref} id={id} />
      <StyledLabel htmlFor={id}>Phone Number</StyledLabel>
    </React.Fragment>
  );
});

const InnerTextareaUsername = React.forwardRef<
  HTMLTextAreaElement,
  React.JSX.IntrinsicElements['textarea']
>(function InnerTextarea(props, ref) {
  const id = React.useId();
  return (
    <React.Fragment>
      <StyledTextarea minRows={1} {...props} ref={ref} id={id} />
      <StyledLabel htmlFor={id}>Username</StyledLabel>
    </React.Fragment>
  );
});

const InnerTextareaPassword = React.forwardRef<
  HTMLTextAreaElement,
  React.JSX.IntrinsicElements['textarea']
>(function InnerTextarea(props, ref) {
  const id = React.useId();
  return (
    <React.Fragment>
      <StyledTextarea minRows={1} {...props} ref={ref} id={id} />
      <StyledLabel htmlFor={id}>Password</StyledLabel>
    </React.Fragment>
  );
});

export default function AuthenticationModal() {
    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <div>
            <CssVarsProvider>
                <React.Fragment>
                    <Modal
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                        open={false}
                        onClose={() => setOpen(false)}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Stack className={"form-box"}>
                            <Stack className={"main-box"}>
                                <Typography className={"head-info"}>Sign-Up Form</Typography>
                                <Box className={"info-box"}>
                                    <form
                                        onSubmit={(event) => {
                                        event.preventDefault();
                                        }}
                                    >
                                        <Textarea
                                            slots={{ textarea: InnerTextareaUsername }}
                                            className={"text-area"}
                                        />
                                        <Textarea
                                            slots={{ textarea: InnerTextareaPhoneNumber }}
                                            className={"text-area"}
                                        />
                                        <Input
                                            type="password"
                                            slots={{ input: InnerTextareaPassword }}
                                            className={"text-area"}
                                        />
                                        <Button type="submit">Sine-up</Button>
                                    </form>
                                </Box>
                            </Stack>
                            <img src="/img/auth.webp" />
                        </Stack>
                    </Modal>

                    <Modal
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                        open={open}
                        onClose={() => setOpen(false)}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Stack className={"form-box"}>
                            <Stack className={"main-box"}>
                                <Typography className={"head-info"}>Sign-In Form</Typography>
                                <Box className={"info-box"}>
                                    <form
                                        onSubmit={(event) => {
                                        event.preventDefault();
                                        }}
                                    >
                                        <Textarea
                                            slots={{ textarea: InnerTextareaUsername }}
                                            className={"text-area"}
                                        />
                                        <Input
                                            type="password"
                                            slots={{ input: InnerTextareaPassword }}
                                            className={"text-area"}
                                        />
                                        <Button type="submit">Login</Button>
                                    </form>
                                </Box>
                            </Stack>
                            <img src="/img/auth.webp" />
                        </Stack>
                    </Modal>
                </React.Fragment>
            </CssVarsProvider> 
        </div>
    );
}