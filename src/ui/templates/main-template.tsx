import styled from 'styled-components';

type Props = {
  header: React.ReactNode;
  backLink?: React.ReactNode;
  title?: React.ReactNode;
  body: React.ReactNode;
  children?: never;
};

export const MainTemplate: React.FC<Props> = ({
  header,
  backLink,
  title,
  body,
}) => {
  return (
    <MainTemplateWraper>
      {header}
      <ContetntWithPaddings>
        <Main>
          <BackLinkConteiner>{backLink}</BackLinkConteiner>
          <TitleConteiner>{title}</TitleConteiner>
          <BodyConteiner>{body}</BodyConteiner>
        </Main>
        <Footer>
          <FooterDeliniter />
          <Year>{new Date().getFullYear()}</Year>
        </Footer>
      </ContetntWithPaddings>
    </MainTemplateWraper>
  );
};

const MainTemplateWraper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: auto;
  background-color: var(--backgrpund-primary-color);
`;

const Main = styled.div`
  width: 100%;
  flex-grow: 1;
`;

const ContetntWithPaddings = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BackLinkConteiner = styled.div`
  width: 100%;
  text-align: start;
  height: 50px;
`;

const TitleConteiner = styled.div`
  width: 100%;
  text-align: start;
  height: auto;
`;

const BodyConteiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Footer = styled.footer`
  width: 100%;
  height: 50px;
  color: var(--text-secondary-color);
`;

const FooterDeliniter = styled.hr`
  width: 100%;
`;

const Year = styled.div``;
