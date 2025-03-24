import { ReactNode } from 'react';
import bgDesktopLight from '../assets/backgrounds/bg-desktop-light.jpg';
// import bgDesktopDark from '../assets/backgrounds/bg-desktop-dark.jpg'

interface BackgroundProps {
  children: ReactNode;
}

function Background({ children }: BackgroundProps) {
  return (
    <div>
      <img className="" src={bgDesktopLight} alt="background-desktop-light" />
      <div>{children}</div>
    </div>
  );
}

export default Background;
