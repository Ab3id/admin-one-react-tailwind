import { mdiAccount } from "@mdi/js";
// import Button from "../../_components/Button";
import SectionMain from "../../_components/Section/Main";
import SectionTitleLineWithButton from "../../_components/Section/TitleLineWithButton";
import CardBoxUser from "../../_components/CardBox/User";
import { getPageTitle } from "../../_lib/config";
import { Metadata } from "next";
// import PasswordForm from "./_components/PasswordForm";
// import ProfileForm from "./_components/ProfileForm";

export const metadata: Metadata = {
  title: getPageTitle("Profile"),
};

export default function ProfilePage() {
  return (
    <SectionMain>
      <SectionTitleLineWithButton icon={mdiAccount} title="User Profile" main>
       
      </SectionTitleLineWithButton>

      <CardBoxUser className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <ProfileForm /> */}
        {/* <PasswordForm /> */}
      </div>
    </SectionMain>
  );
}
