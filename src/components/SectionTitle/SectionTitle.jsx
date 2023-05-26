
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center">
            <p className="text-orange-400">---{heading}---</p>
            <h3 className="text-5xl border-y-4 py-3 border-stone-400 w-1/3 mx-auto my-4">{subHeading}</h3>
        </div>
    );
};

export default SectionTitle;