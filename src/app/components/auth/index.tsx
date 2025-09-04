import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import { Box, CssVarsProvider, Input, Stack, styled, Typography } from '@mui/joy';
import Textarea from '@mui/joy/Textarea';
import "../../../css/auth.css";
import { Label } from '@mui/icons-material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useState } from 'react';
import { useGlobals } from '../../hooks/useGlobals';
import { T } from '../../../lib/types/common';
import { Messages } from '../../../lib/config';
import { LoginInput, MemberInput } from '../../../lib/types/member';
import MemberService from '../../services/MemberService';
import { sweetErrorHandling } from '../../../lib/sweetAlert';


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

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {

    const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
    const [memberNick, setMemberNick] = useState<string>("");
    const [memberPhone, setMemberPhone] = useState<string>("");
    const [memberPassword, setMemberPassword] = useState<string>("");
    const { setAuthMember } = useGlobals();

    /* HANDLERS */

    const handleUsername = (e: T) => {
      setMemberNick(e.target.value);
    };

    const handlePhone = (e: T) => {
      setMemberPhone(e.target.value);
    };

    const handlePassword = (e: T) => {
      setMemberPassword(e.target.value);
    };

    const handlePasswordKeyDown = (e: T) => {
      if(e.key === "Enter" && signupOpen) {
        handleSignupRequest().then();
      } else if(e.key === "Enter" && loginOpen) {
        handleLoginRequest().then();
      }
    };

    const handleSignupRequest = async () => {
      try {
        const isFulfill =
          memberNick !== '' && memberPhone !== '' && memberPassword !== '';
        if(!isFulfill) throw new Error(Messages.error3);

        const signupInput: MemberInput = {
          memberNick: memberNick,
          memberPassword: memberPassword,
          memberPhone: memberPhone
        };

        const member = new MemberService();
        const result = await member.signup(signupInput);


        setAuthMember(result);
        handleSignupClose();

      } catch (err) {
        console.log(err);
        handleSignupClose();
        sweetErrorHandling(err).then();
      }
    };

    const handleLoginRequest = async () => {
      try {
        const isFulfill =
          memberNick !== '' && memberPassword !== '';
        if(!isFulfill) throw new Error(Messages.error3);

        const loginInput: LoginInput = {
          memberNick: memberNick,
          memberPassword: memberPassword,
        };

        const member = new MemberService();
        const result = await member.login(loginInput);

        setAuthMember(result);
        handleLoginClose();

      } catch (err) {
        console.log(err);
        handleLoginClose();
        sweetErrorHandling(err).then();
      }
    };
    return (
        <div>
            <CssVarsProvider>
                <React.Fragment>
                    <Modal
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                        open={signupOpen}
                        onClose={handleSignupClose}
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
                                            onChange={handleUsername}
                                        />
                                        <Textarea
                                            slots={{ textarea: InnerTextareaPhoneNumber }}
                                            className={"text-area"}
                                            onChange={handlePhone}
                                        />
                                        <Input
                                            type="password"
                                            slots={{ input: InnerTextareaPassword }}
                                            className={"text-area"}
                                            onChange={handlePassword}
                                            onKeyDown={handlePasswordKeyDown}
                                        />
                                        <Button type="submit" onClick={handleSignupRequest}>Sine-up</Button>
                                    </form>
                                </Box>
                            </Stack>
                            <img src="/img/auth.webp" />
                        </Stack>
                    </Modal>

                    <Modal
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                        open={loginOpen}
                        onClose={handleLoginClose}
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
                                            onChange={handleUsername}
                                        />
                                        <Input
                                            type="password"
                                            slots={{ input: InnerTextareaPassword }}
                                            className={"text-area"}
                                            onChange={handlePassword}
                                        />
                                        <Button type="submit" onClick={handleLoginRequest}>Login</Button>
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