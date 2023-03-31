import { Galleries } from '@/components/Galleries';

export default function Home() {
  return (
    <div className="space-y-6 container mx-auto p-4">
      <h1 className="font-bold text-2xl">PhotoSwiper</h1>

      <Galleries />
    </div>
  );
}
