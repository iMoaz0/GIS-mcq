export const metadata = { title: "GIS MCQ Training", description: "Practice GIS MCQs by lecture with instant feedback" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <link rel="stylesheet" href="/styles.css" />
        {children}
      </body>
    </html>
  );
}
