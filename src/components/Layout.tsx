import { HeaderContainer } from '../styles/components/Layout';
import { LeftCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/useAuth';
import { useMemo } from 'react';

interface IHeader {
  children: React.ReactNode;
}

export default function Header({ children }: IHeader) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const shouldShowGoBackButton = useMemo(
    () =>
      router.asPath !== '/' &&
      router.asPath !== '/home' &&
      !router.asPath.includes('/r/') &&
      !router.asPath.includes('/verify'),
    [router.asPath]
  );

  const { handleLogout, isAuthenticated } = useAuth();

  return (
    <>
      <HeaderContainer>
        {shouldShowGoBackButton && (
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
