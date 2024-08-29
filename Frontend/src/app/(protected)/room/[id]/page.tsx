"use client";
import { roboto } from "@/app/fonts";
import Formdata_ from "@/components/IdeaCreationGrp/FormdataCompo";
import ProjectUpdates from "@/components/ProjectUpdates";
import TextInputWithCloudinary from "@/components/TextAreaStyle";
import GeminiStyleInput from "@/components/TextAreaStyle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { userAtom } from "@/lib/atoms/UserAtom";
import { Domain } from "@/lib/Domain";
import UseAuth from "@/lib/hooks/UseUser";
import { Ideas, project_update, Rooms } from "@/lib/interface/INTERFACE";
import axios from "axios";
import { useAtom } from "jotai";
import { ArrowRight, ChevronLeft, ChevronRight, Paperclip, Pin, Upload } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const [DataLoading, setDataloading] = useState<boolean>(false);
    const [startupRender, setstartupRender] = useState<boolean>(true);
    const [CreateIdeaCard, setCreateIdeaCard] = useState<boolean>(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [ideaData, setIdeadata] = useState<Ideas>();
    const [roomData, setroomdata] = useState<Rooms>();
    const [roomId, setroomId] = useState<string>();
    const [ideaSubmitted, setideaSubmitted] = useState<boolean>(false);
    const [InputUpdate, setInputUpdate] = useState<string>("");
    const [imagelink, setimagelink] = useState<string[]>([]);
    const [videolink, setvideolink] = useState<string[]>([]);
    const [update_list, setupdate_list] = useState<project_update[]>([]);
    const [sidebarOpen,setsidebarOpen] = useState<boolean>(false)
    const { toast } = useToast();
    const pathname = usePathname();
    const parts = pathname.split("/");
    useEffect(() => {
        const roomIdFromPath = parts[2];
        if (roomIdFromPath && roomIdFromPath !== roomId) {
            setroomId(roomIdFromPath);
        }
    }, [pathname, roomId]);

    useEffect(() => {
        const fetchIdeaData = async () => {
            try {
                toast({
                    title: "Data is Fetching",
                    description:
                        "Due to heavy traffic, delay is there to retrieve data from server.",
                });
                const ideaData = await axios.get(
                    `${Domain}/api/v1/idea/get-idea`,
                    {
                        params: {
                            roomId: roomId,
                        },
                    }
                );
                const roomData = await axios.get(
                    `${Domain}/api/v1/room/get-room-data`,
                    {
                        params: {
                            roomId: roomId,
                        },
                    }
                );
                console.log("hello", roomData);
                setIdeadata(ideaData.data.data);
                setroomdata(roomData.data.data);

                setupdate_list(roomData.data.data.project_update);

                toast({
                    title: "Data is Fetched",
                    description: "Continue your work",
                });
            } catch (error) {
                toast({
                    title: "Error Fetching Data",
                    description:
                        "Unable to retrieve data. Please try again later.",
                    variant: "destructive",
                });
            }
        };
        if (roomId) {
            fetchIdeaData();
        }
    }, [roomId]);

    useEffect(() => {
        if (ideaData) {
            setstartupRender(false);
            setideaSubmitted(true);
        }
    }, [ideaData]);
    const CreateButtonHandlerStartup = async () => {
        setIsFadingOut(true);
        setstartupRender(false);
        setCreateIdeaCard(true);
        setIsFadingOut(false); // Reset a
    };
    const SubmitUpdate = async () => {
        try {
            const UpdateData = await axios.post(
                `${Domain}/api/v1/update/create`,
                {
                    update_text: InputUpdate,
                    image_link: imagelink,
                    video_link: videolink,
                    author_id: userId,
                    roomId: roomId,
                }
            );
            if (UpdateData) {
                setInputUpdate('')
                console.log(UpdateData);
                setupdate_list([...update_list, UpdateData.data.data]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        console.log(update_list);
    }, [update_list]);

    return (
        <div className="w-full h-full flex flex-col justify-start items-start bg-radial-grid bg-[length:20px_20px] overflow-hidden">
            <div className="w-full h-full overflow-y-scroll">
                <div>
                    <div className="flex gap-1 justify-center items-center z-10 absolute text-3xl font-extrabold pt-4 pl-1">

                        <div className="border-2 rounded-md cursor-pointer flex justify-center items-center" onClick={()=>setsidebarOpen(true)}>
                        <ChevronRight size={30}/>
                        </div>
                        {roomData && roomData.room_name}
                    </div>
                    <div className={`z-10 absolute flex flex-col gap-4 pt-4 justify-start items-center text-3xl font-extrabold h-[calc(100vh-60px)] bg-gray-100 ${sidebarOpen?`w-[12%]`:`w-[0%] hidden`}`}>
                        <div className="flex gap-4 justify-center items-center whitespace-pre-wrap">
                            <div className="w-full overflow-hidden">
                        {roomData && roomData.room_name}
                            </div>
                        <div className="border-2 mt-1 rounded-md shadow-md cursor-pointer flex justify-center items-center" onClick={()=>setsidebarOpen(false)}>
                        <ChevronLeft size={30}/>
                        </div>
                        </div>
                        <div className="flex flex-col justify-center items-start w-full pt-4">
                            <Button variant={'ghost'} className="text-lg w-full">Members</Button>
                            <Button variant={'ghost'} className="text-lg w-full">Request</Button>
                            <Button variant={'ghost'} className="text-lg w-full">Settings</Button>
                        </div>
                    </div>
                </div>
                    <div className="absolute z-10 ml-[12%] w-[65%] bg-black h-[calc(100vh-100px)] ">

                    </div>
                {startupRender && (
                    <div className="flex w-full h-full flex-col justify-center items-center">
                        <div
                            className={`w-[60%] h-[30%] rounded-lg flex flex-col justify-center items-center p-5 gap-4 ${
                                isFadingOut ? "animate-fadeOut" : ""
                            }`}
                        >
                            <div className="w-full h-full flex flex-col justify-center items-center p-5 gap-2">
                                <div className="font-extrabold text-[50px]">
                                    Initialize Journey by Posting Idea
                                </div>
                                <div className="w-[80%] text-gray-600">
                                    If you are looking to submit your project,
                                    the first step is to present your idea.
                                    Without a clear idea, your project lacks
                                    direction and purpose.
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button onClick={CreateButtonHandlerStartup}>
                                    Create Idea
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                {CreateIdeaCard && (
                    <div className="flex w-full h-full flex-col justify-center items-center">
                        <div className="flex items-center flex-col h-full lg:max-h-[calc(100vh-60px)]">
                            <div className="text-[40px] font-serif m-10">
                                Idea Submission
                            </div>
                            <div className="w-[100%] h-full opacity-100 animate-fadeIn">
                                <Formdata_ setSubmitted={setideaSubmitted} />
                            </div>
                        </div>
                    </div>
                )}
                <div className="w-full   flex justify-start items-center pt-4 flex-col">
                    {ideaSubmitted && (
                        <div className="flex flex-col w-[90%] h-auto gap-5 border-2 p-6 rounded-lg glass-effect">
                            <div className="text-[40px]">
                                <p className={roboto.className}>Idea</p>
                            </div>
                            <div className="font-extrabold text-3xl">
                                {ideaData?.idea_name}
                            </div>
                            <div className="px-3 py-2">
                                {ideaData?.idea_text}
                            </div>
                            <div className="px-4 text-blue-500">
                                {ideaData?.usefull_links &&
                                Array.isArray(ideaData.usefull_links) ? (
                                    ideaData.usefull_links.map(
                                        (link: string, index: number) => (
                                            <a
                                                key={index}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:border-b border-blue-500 cursor-pointer w-auto"
                                            >
                                                {link}
                                            </a>
                                        )
                                    )
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        </div>
                    )}
                    
                    <div className="w-full flex flex-col pb-[120px]">

                    {/* {update_list &&
                        update_list.map((update_data: project_update,index) => {
                            if(userId===update_data.author_id){
                                return(
                                    <div className="w-full flex justify-end" key={index}>
                                        <div className="border-2 p-5 m-3">
                                        <div className="text-lg font-semibold">
                                            {update_data?.text}
                                        </div>
                                        <div className="flex ">
                                            {
                                                update_data.image_link && update_data.image_link.map((image,index)=>{
                                                    return(
                                                        <img src={image} alt="" key={index}/>
                                                    )
                                                })
                                            }
                                        </div>
                                        </div>
                                    </div>
                                )
                            }
                            return (
                            <div className="w-full flex justify-start">
                                {update_data?.text}
                            </div>
                            );
                        })} */}
                        {
                            update_list && userId && (<ProjectUpdates updateList={update_list} currentUserId={userId}/>)
                        }
                        
                        </div>
                </div>
                {ideaData && (
                    <div className="absolute bottom-0 right-0  w-screen lg:w-[calc(100vw-760px)] md:w-[calc(100vw-400px)] pb-8 pr-8 flex justify-center items-center">
                        <TextInputWithCloudinary
                            onTextareaChange={(value) => {
                                console.log(value);

                                setInputUpdate(value);
                            }}
                            textareaValue={InputUpdate}
                            setImageMediaLinks={setimagelink}
                            setVideoMediaLinks={setvideolink}
                        />
                        <Button
                            className="absolute bottom-0 right-0  mb-14 mr-12"
                            onClick={SubmitUpdate}
                        >
                            <Upload />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;