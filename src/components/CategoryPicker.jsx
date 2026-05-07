const CategoryPicker = ({handleSelect}) => {
    return (
        <select onChange={(e) => handleSelect(e.target.value)}>
            <option value="">Välj kategori...</option>
            <option value="Djur och friluftsliv">Djur och friluftsliv</option>
            <option value="E-sport och spel">E-sport och spel</option>
            <option value="Fri lek">Fri lek</option>
            <option value="Fritid och hobby">Fritid och hobby</option>
            <option value="Konst och design">Konst och design</option>
            <option value="Kreativt skapande">Kreativt skapande</option>
            <option value="Lärande och språk">Lärande och språk</option>
            <option value="Nöje">Nöje</option>
            <option value="Quiz och frågesport">Quiz och frågesport</option>
            <option value="Sport och idrott">Sport och idrott</option>
            <option value="Utställning">Utställning</option>
            <option value="Workshop">Workshop</option>
        </select>
    )
}

export default CategoryPicker
