import { describe, it, expect } from "vitest";
import { shows } from "./data";

describe("reduce method", () => {
    it.only("calculates the total of an array", () => {
        const numbers = [1, 2, 3, 4, 5];

        // TODO: do something here
        const sum = numbers.reduce((sum, number) => {
            sum += number;
            return sum;
        });

        expect(sum).toBe(15);
    });

    it.only("groups by genre", () => {
        // TODO: do something with `shows` here
        const callbackFn = (result, show) => {
            if (!result[show.genre]) {
                result[show.genre] = [];
            }
            result[show.genre].push(show.title);
            return result;
        };
        const initialValue = {};
        const groupedShows = shows.reduce(callbackFn, initialValue);
        expect(groupedShows).toEqual({
            Comedy: ["Don't Look Up"],
            Drama: ["Stranger Things", "Our Blues", "Inventing Anna"],
            Mistery: ["Dirk Gently's Holistic Detective Agency"],
            Mystery: ["Little Women"],
        });
    });

    it.only("groups by key (2)", () => {
        // TODO: do something with `shows` here
        const groupedShows = shows.reduce((result, show) => {
            const index = result.findIndex((resultShow) => resultShow.genre === show.genre);
            if (index === -1) {
                result.push({
                    genre: show.genre,
                    titles: [show.title],
                });
            } else {
                result[index].titles.push(show.title);
            }
            return result;
        }, []);
        expect(groupedShows).toEqual([
            {
                genre: "Drama",
                titles: ["Stranger Things", "Our Blues", "Inventing Anna"],
            },
            {
                genre: "Mystery",
                titles: ["Little Women"],
            },
            {
                genre: "Comedy",
                titles: ["Don't Look Up"],
            },
            {
                genre: "Mistery",
                titles: ["Dirk Gently's Holistic Detective Agency"],
            },
        ]);
    });

    it.only("flattens array", () => {
        const nestedArray = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];

        // TODO: do something here
        const flatArray = nestedArray.reduce((resultArray, arrayOfNumber) =>{
        resultArray.push(...arrayOfNumber);
        return resultArray;
        },[])
        expect(flatArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it.only("extracts writer names", () => {
        // TODO: do something with `shows` here
        const writerNames = shows.reduce((names, show)=>{
            names.push(...show.writers);
            return names;  
        }, [])
        expect(writerNames).toEqual([
            "Matt Duffer",
            "Ross Duffer",
            "Jessie Nickson-Lopez",
            "Kate Trefry",
            "Justin Doble",
            "Alison Tatlock",
            "Paul Dichter",
            "Jessica Mecklenburg",
            "Seo-Gyeong Jeong",
            "Hee-kyung Noh",
            "Shonda Rhimes",
            "Carolyn Ingber",
            "Jessica Pressler",
            "Nicholas Nardini",
            "Adam McKay",
            "Max Landis",
            "Douglas Adams",
        ]);
    });
});
