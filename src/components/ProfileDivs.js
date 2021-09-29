import styled from "@emotion/styled";

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 20px;
  padding: 10px 18px;
  border-bottom: 1px solid #a9a6a699;

  & .logo {
    width: 64px;
    height: 64px;
    border-radius: 4px;
    margin-right: 24px;
    border-radius: 5px;
    .logo-icon {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  & .item-name {
  }
  & .name {
    margin-top: 5px;
    font-size: 26px;
    line-height: 27px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: capitalize;
  }
  & .std {
    margin-top: 5px;
    font-size: 16px;
    opacity: 0.8;
    letter-spacing: 1.3px;
  }
`;

export const InfoSection = styled.div`
  & .info {
    padding: 10px 18px;
    & .key {
      width: 20%;
      font-weight: bold;
    }
    & .value {
      text-transform: capitalize;
      font-weight: bold;
      .link {
        text-decoration: none;
        color: #207aef;
        cursor: pointer;
        font-weight: bold;
        :hover {
          color: #376dc8;
        }
      }
      span {
        font-weight: lighter;
        margin-left: 10px;
        font-size: 11px;
      }
    }

    & .sep {
      margin-left: 10px;
      margin-right: 20px;
    }

    & .info-item {
      display: flex;
      align-items: center;
      padding: 12px 18px;
    }
  }
`;

export const Profile = styled.div`
  height: 100%;
  color: white;
`;
