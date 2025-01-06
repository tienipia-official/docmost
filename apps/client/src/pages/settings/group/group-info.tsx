import SettingsTitle from "@/components/settings/settings-title.tsx";
import GroupMembersList from "@/features/group/components/group-members";
import GroupDetails from "@/features/group/components/group-details";
import {getAppName} from "@/lib/config.ts";
import {Helmet} from "react-helmet-async";

export default function GroupInfo() {
    return (
        <>
            <Helmet>
                <title>그룹 관리 - {getAppName()}</title>
            </Helmet>
            <SettingsTitle title="그룹 관리"/>
            <GroupDetails/>
            <GroupMembersList/>
        </>
    );
}
