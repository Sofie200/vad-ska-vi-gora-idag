const FreePicker = ({toggleFree}) => {
    return (
        <label className="free-toggle">
            <input type="checkbox" id="free" onChange={(e) => toggleFree(e.target.checked)} />
            Visa endast gratisaktiviteter
        </label>
    )
}

export default FreePicker
