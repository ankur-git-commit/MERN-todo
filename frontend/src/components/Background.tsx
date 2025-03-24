import { ReactNode } from 'react';
import bgDesktopLight from '../assets/backgrounds/bg-desktop-light.jpg';
// import bgDesktopDark from '../assets/backgrounds/bg-desktop-dark.jpg'

interface BackgroundProps {
  children: ReactNode;
}

function Background({ children }: BackgroundProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="relative">
        <img
          className="h-96 w-full object-cover"
          src={bgDesktopLight}
          alt="background-desktop-light"
        />
        <div className="absolute top-32 right-0 left-0 mx-auto">
          <div className="mx-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Background;
