
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-edu-primary">EduNexus Hub</h1>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 py-8">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">© 2023 EduNexus Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;
