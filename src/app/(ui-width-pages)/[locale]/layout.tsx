import ClientLayout from './ClientLayout';

/**
 * Layout cho trang locale của học viên
 * @param children - Các component con
 * @param params - Promise chứa locale hiện tại
 * @returns React Component cho locale layout
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // OLD:
  // export default async function LocaleLayout({
  //   children,
  //   // params,
  // }: {
  //   children: React.ReactNode;
  //   params: { locale: string };
  // }) {
  //   // const param = await params
  //   return (
  //     <ClientLayout>{children}</ClientLayout>
  //   );
  // }
  
  const { locale } = await params;
  return (
    <ClientLayout>{children}</ClientLayout>
  );
}
