import Portfolio from '@/components/Portfolio';

export const metadata = {
  title: 'Tanvir Hossain | Senior Full Stack Architect',
  description: 'Portfolio of Tanvir Hossain, a Full Stack Developer specialized in MERN stack and high-performance architecture.',
};

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Portfolio />
    </main>
  );
}