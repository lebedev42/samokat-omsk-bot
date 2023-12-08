"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importStar(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const qs_1 = __importDefault(require("qs"));
const app = (0, express_1.default)();
app.use((0, express_1.urlencoded)({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static("public"));
app.get("/api/players", async (req, res) => {
    const { user } = req.query;
    console.error("req", user);
    const query = qs_1.default.stringify({
        filters: {
            ["tgId"]: {
                $eq: user
            }
        }
    });
    const data = await fetch(`${process.env.API_BASE_URL}/api/players?${query}`, {
        method: "GET"
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
        .then((data) => {
        return data;
    })
        .catch((error) => {
        console.error("Error:", error);
    });
    res.status(200).json(data).end();
});
app.listen(parseInt(process.env.PORT), "localhost", () => {
    console.log("Server started", process.env.PORT);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlCQUF1QjtBQUN2QixtREFBOEM7QUFDOUMsOERBQXFDO0FBQ3JDLDRDQUFvQjtBQUVwQixNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsb0JBQVUsRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBRWxDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDekMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFFM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFM0IsTUFBTSxLQUFLLEdBQUcsWUFBRSxDQUFDLFNBQVMsQ0FBQztRQUN6QixPQUFPLEVBQUU7WUFDUCxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNSLEdBQUcsRUFBRSxJQUFJO2FBQ1Y7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLGdCQUFnQixLQUFLLEVBQUUsRUFBRTtRQUMzRSxNQUFNLEVBQUUsS0FBSztLQUNkLENBQUM7U0FDQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNiLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVMLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ25DLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFO0lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsRCxDQUFDLENBQUMsQ0FBQyJ9