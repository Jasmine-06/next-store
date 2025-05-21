import NavbarIndex from "./_components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <div>
      <NavbarIndex/>
        {children}
     </div>
  );
}
