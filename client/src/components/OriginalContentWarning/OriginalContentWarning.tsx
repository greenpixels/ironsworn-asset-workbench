/** @format */

import { Button } from "antd";
import Link from "antd/es/typography/Link";

type OriginalContentWarningProps = {
    onHide?: () => void;
};

export default function OriginalContentWarning(
    props: OriginalContentWarningProps
) {
    return (
        <div>
            <span>
                This is one of the original assets of ironsworn. To support the
                original creators, please visit:
            </span>
            <br />
            <Link href="https://www.ironswornrpg.com/" target="_blank">
                https://www.ironswornrpg.com/
            </Link>

            {props.onHide && (
                <>
                    <br />
                    <br />
                    <Button
                        ghost
                        type="primary"
                        style={{ border: "none", padding: "0" }}
                        onClick={() => props.onHide!()}
                    >
                        Hide
                    </Button>
                </>
            )}
        </div>
    );
}
