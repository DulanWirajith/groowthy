const Card = ({
                  title,
                  reasons,
                  bgColor,
                  borderColor,
                  removeNumbers = false,
              }: {
    title: string,
    reasons: string[];
    bgColor: string;
    borderColor: string;
    removeNumbers?: boolean;
}) => {
    const cardStyle = {
        backgroundColor: bgColor,
        borderColor: borderColor
    };

    return (
        <div className="flex-1 border w-full p-4 px-5 rounded my-5" style={ cardStyle }>
            <div>
                <p className="[font-family:'Poppins',Helvetica] text-white text-[28px] font-bold">{ title }</p>
            </div>
            <div className="ml-7 mt-5 mb-5">
                {
                    removeNumbers ?
                        <p> { reasons[0] } </p>
                        :
                        <ol className="list-decimal">
                            { reasons.map((reason, index) => (
                                <li key={ index } className="font-medium text-xl">{ reason }</li>
                            )) }
                        </ol>
                }
            </div>
        </div>
    );
};

export default Card;
