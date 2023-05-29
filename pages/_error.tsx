import ErrorContainer from "@/components/ErrorContainer";
import { NextPageContext } from "next";

type Props = {
    statusCode: number,
    message: string
}

const Error = ({ statusCode, message }: Props) => {
    return (
        <div className="w-full h-full mt-[70px] lg:mt-[20px]">
            <ErrorContainer code={statusCode} message={message} />
        </div>
    );
};

Error.getInitialProps = ({ req, res, err }: NextPageContext) => {
    const statusCode: number = res?.statusCode || (err?.statusCode || 500);
    const message: string = (statusCode === 404) ? 'Not Found' : (err?.message || `An error ${statusCode} occurred on server`);

    console.log(req?.url);
    console.log(statusCode);
    console.log(message);

    if (req?.url?.includes('/api/')) {
        if (res) {
            res.statusCode = statusCode;
            res.setHeader('Content-Type', 'application/json');
            res.end(`{ "message" : "${message}" }`);
            return;
        }
    }

    return { statusCode, message };
};

export default Error;