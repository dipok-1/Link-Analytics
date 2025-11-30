type MsgBox = {
  Msg: string;
  onClose: () => void;   // callback to close popup
};

const AlertBox = ({ Msg, onClose }: MsgBox) => {
  return (
<div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
  <div className="bg-white rounded-xl shadow-2xl p-6 w-80 animate-fadeIn border border-red-300">
    
    <p className="text-lg font-semibold text-red-600 mb-4">
      {Msg}
    </p>

    <button
      onClick={onClose}
      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium shadow-sm"
    >
      OK
    </button>
  </div>
</div>


  );
};

export default AlertBox;
