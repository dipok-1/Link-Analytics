



function ExpiredPage() {
    return(
     <div className="min-h-screen bg-red-100 flex flex-col items-center justify-center p-6">
       <div className="border  bg-white shadow-xl rounded-2xl p-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-600">Link Expired</h1>
          <p className="text-lg text-gray-600">The link you are trying to access is no longer valid.</p>
        </div>
      </div>
    )
}
export default ExpiredPage;