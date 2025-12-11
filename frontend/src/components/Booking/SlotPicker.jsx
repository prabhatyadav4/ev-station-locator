import { clsx } from 'clsx';

const SlotPicker = ({ slots, selectedSlot, onSelect }) => {
    return (
        <div className="grid grid-cols-3 gap-2">
            {slots.map((slot) => (
                <button
                    key={slot.time}
                    onClick={() => onSelect(slot)}
                    disabled={!slot.available}
                    className={clsx(
                        'p-2 rounded-lg text-sm font-medium transition-all',
                        selectedSlot?.time === slot.time
                            ? 'bg-primary text-black shadow-neon'
                            : slot.available
                                ? 'bg-dark-700 text-white hover:bg-dark-600'
                                : 'bg-dark-800 text-gray-600 cursor-not-allowed'
                    )}
                >
                    {new Date(slot.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </button>
            ))}
        </div>
    );
};

export default SlotPicker;
