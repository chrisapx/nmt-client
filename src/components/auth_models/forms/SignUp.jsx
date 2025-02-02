import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { api_urls } from "../../utils/ResourceUrls";
import { useAuth } from "../../../context/AuthContext";
import LoaderIcon from "../../../global/LoaderIcon";

export default function SignUp() {
    const { showAuth, dispatchAuth } = useAuth();
    const [user, setUser] = useState({ fullName: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async () => {
        const logins = { username: user.email, password: user.password };
        console.log(logins);
        try{
            const response = await fetch(api_urls.users.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logins)
            });

            if(response.ok){
                const data = await response.json();
                console.log(data);
                setAuthUser(data.user);
                setUserToken(data.token);
                setSuccess("Success, redirecting you ...");
                setTimeout(() => {
                    dispatchAuth(false);
                    handleRefresh();
                    window.location.reload();
                }, 300);
            } else {
                setError(await response.text());
            }
            
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div>
        <form>
            <InputText
                value={user.email}
                onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Email"
                required
                name="email"
                className="bg-white-alpha-20 rounded-none border hover:border-black p-3 text-primary-50"
            />
            <InputText
                type="password"
                value={user.password}
                onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Password"
                required
                name="password"
                className="bg-white-alpha-20 rounded-none border hover:border-black p-3 text-primary-50"
            />
            <Button
                label="Sign Up"
                type="submit"
                disabled={isLoading || !user.email} 
                icon={isLoading && <LoaderIcon color={'white'}/>} 
                className="bg-red-500 py-3 w-full text-white text-center"
            />
        </form>
    </div>
  );
}