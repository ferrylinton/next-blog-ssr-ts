import ErrorContainer from "@/components/ErrorContainer";
import { NextPageContext } from "next";

type Props = {
    statusCode: number,
    message: string
}

const Error = ({ statusCode, message }: Props) => {
    return <ErrorContainer code={statusCode} message={message} label='Error'/>
};

Error.getInitialProps = ({ req, res, err }: NextPageContext) => {
    console.log(res?.statusCode)
    const statusCode: number = res?.statusCode || (err?.statusCode || 500);
    const message: string = (statusCode === 404) ? 'Not Found' : (err?.message || `An error ${statusCode} occurred on server`);

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