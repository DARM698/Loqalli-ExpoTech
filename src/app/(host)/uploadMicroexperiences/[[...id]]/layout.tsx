import { ReactNode } from 'react';

export const metadata = {
  title: 'Loqalli | List your Experience',
  description: 'Create a new micro-experience in El Salvador',
};

export default function ExperienceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="bg-white min-h-screen">
      {/* Aquí podrías poner un Navbar específico si quisieras */}
      {children}
    </section>
  );
}