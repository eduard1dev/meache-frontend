import { HeaderContainer } from '../styles/components/Layout';
import { LeftCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/useAuth';

interface IHeader {
  children: React.ReactNode;
}

export default function Header({ children }: IHeader) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const { handleLogout, isAuthenticated } = useAuth();

  return (
    <>
      <HeaderContainer>
        {router.asPath !== '/' && router.asPath !== '/home' && (
          <LeftCircleFilled className="back_icon" onClick={handleGoBack} />
        )}
        <a href="/">meache</a>
        {!!isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </HeaderContainer>
      <main>
        <div>{children}</div>
      </main>
    </>
  );
}
