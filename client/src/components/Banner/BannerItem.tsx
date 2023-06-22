import { motion } from "framer-motion";
function BannerItem({ bg, isActive, image }: { bg: string; isActive: boolean; image: string }) {
    return (
        <div className={`${bg} h-[510px] w-full relative`}>
            <div className="absolute top-[50%] left-[150px] translate-y-[-50%] flex flex-col">
                <motion.h2
                    className="text-[40px] text-white font-semibold"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -40 }}
                    transition={{ delay: 0.8, type: "spring", duration: 1, stiffness: 50 }}
                >
                    The best tablet <br /> Collection 2023k
                </motion.h2>
                <motion.p
                    className="text-[14px] text-white"
                    initial={{ opacity: 0, y: -80 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -80 }}
                    transition={{ delay: 0.4, type: "spring", duration: 1, stiffness: 50 }}
                >
                    Great furniture can bring beauty at your home, So buy our popular <br /> and stylish furniture. Now
                    you get up to 100 % discount now.
                </motion.p>
            </div>
            <motion.div
                className="absolute top-[50%] right-[150px] translate-y-[-50%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ delay: 0.6, type: "spring", duration: 1, stiffness: 50 }}
            >
                <img src={image} alt="" />
            </motion.div>
        </div>
    );
}

export default BannerItem;
