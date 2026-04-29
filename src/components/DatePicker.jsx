

const DatePicker = ({ handleChange }) => {

    const today = new Date().toISOString().split("T")[0];
    const maxDate = (() => {
        const d = new Date();
        d.setMonth(d.getMonth() + 3);
        return d.toISOString().split("T")[0];
    })();


    return (
        <div>
            <input type='date'
                name='pick' 
                defaultValue={today}
                min={today}
                max={maxDate}
                onChange={(e) => handleChange(e.target.value)}
                className="date-input" />
        </div>
    )
}

export default DatePicker