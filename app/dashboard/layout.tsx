"use client";

import React, { ReactNode } from "react";
import { useState } from "react";
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
import menuAside from "./_lib/menuAside";
import menuNavBar from "./_lib/menuNavBar";
import Icon from "../_components/Icon";
import NavBar from "./_components/NavBar";
import NavBarItemPlain from "./_components/NavBar/Item/Plain";
import AsideMenu from "./_components/AsideMenu";
import FooterBar from "./_components/FooterBar";
import OrganizationGuard from "../_components/OrganizationGuard";
// import FormField from "../_components/FormField";
// import { Field, Form, Formik } from "formik";

type Props = {
  children: ReactNode;
};

export default function LayoutAuthenticated({ children }: Props) {
  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false);
  const [isAsideLgActive, setIsAsideLgActive] = useState(false);

  const handleRouteChange = () => {
    setIsAsideMobileExpanded(false);
    setIsAsideLgActive(false);
  };

  const layoutAsidePadding = "xl:pl-72";

  return (
    <OrganizationGuard>
      <div className="min-h-screen bg-black text-white">
        {/* Grid Background */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,black,transparent)]"></div>
        
        <div
          className={`${layoutAsidePadding} ${
            isAsideMobileExpanded ? "ml-72 lg:ml-0" : ""
          } pt-16 min-h-screen w-screen transition-position lg:w-auto relative z-10`}
        >
          <NavBar
            menu={menuNavBar}
            className={`${layoutAsidePadding} ${isAsideMobileExpanded ? "ml-72 lg:ml-0" : ""}`}
          >
            <NavBarItemPlain
              display="flex lg:hidden"
              onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
            >
              <Icon
                path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger}
                size="24"
              />
            </NavBarItemPlain>
            <NavBarItemPlain
              display="hidden lg:flex xl:hidden"
              onClick={() => setIsAsideLgActive(true)}
            >
              <Icon path={mdiMenu} size="24" />
            </NavBarItemPlain>
            {/* <NavBarItemPlain useMargin>
              <Formik
                initialValues={{
                  search: "",
                }}
                onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
              >
                <Form>
                  <FormField isBorderless isTransparent>
                    {({ className }) => (
                      <Field
                        name="search"
                        placeholder="Search"
                        className={className}
                      />
                    )}
                  </FormField>
                </Form>
              </Formik>
            </NavBarItemPlain> */}
          </NavBar>
          <AsideMenu
            isAsideMobileExpanded={isAsideMobileExpanded}
            isAsideLgActive={isAsideLgActive}
            menu={menuAside}
            onAsideLgClose={() => setIsAsideLgActive(false)}
            onRouteChange={handleRouteChange}
          />
          {children}
          <FooterBar/>
           {/* Mojaone Holding Ltd */}
           
          {/* </FooterBar> */}
        </div>
      </div>
    </OrganizationGuard>
  );
}
