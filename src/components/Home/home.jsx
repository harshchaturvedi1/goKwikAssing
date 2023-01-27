import React from "react";
import styles from "./home.module.css"
import data from "../../mockdata/data.json"
import { useEffect } from "react";
import { useState } from "react";
export const Home = () => {

    const [allData, setAllData] = useState([])
    const [searchItems, setSearchItems] = useState([]);

    useEffect(() => {
        setAllData([...data.data])
    }, [])

    const filterSearch = () => {
        let temp = []
        if (searchItems.length > 0) {

            data.data.map(ele => {
                let skill = []
                ele.skills.map(item => {
                    searchItems.map(value => {
                        if (value === item) {
                            skill.push(value)
                        }
                    })
                })
                if (skill.length === searchItems.length)
                temp.push(ele)
            })

            setAllData([...temp])
        } else {
            setAllData([...data.data])
        }
    }

    useEffect(() => {
        filterSearch()
    }, [searchItems])

    const searchRoles = (role) => {
        let itemFound = false;
        searchItems.map(item => {
            if (item === role) {
                itemFound = true;
            }
        })
        if (!itemFound)
            setSearchItems([...searchItems, role])
    }

    const removeRoles = (role) => {
        let temp = []
        searchItems.map(ele => {
            if (ele !== role) {
                temp.push(ele)
            }
        })
        // console.log(role)
        setSearchItems([...temp])
    }


    return <div className={styles.wrapper}>
        <div className={styles.topBar}></div>
        {searchItems.length > 0 && <div className={styles.topInput}>
            <div className={styles.allResults}>
                {
                    searchItems.map((ele, i) => (
                        <div className={styles.inputItem} key={i}>
                            <div className={styles.itemCrossName}>{ele}</div>
                            <div className={styles.cutCross} onClick={() => removeRoles(ele)}>
                                <img src="./icons8-multiply-24.png" alt="" />
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* <input type="text" placeholder="" disabled={true}  /> */}
            <div className={styles.clearAll} onClick={() => {
                setSearchItems([])
            }}>clear</div>
        </div>}
        <div className={styles.searchResults}>
            <div className={styles.searchValues}>

            </div>
        </div>
        <div className={styles.container}>

            {
                allData.map((ele, i) => (
                    <div key={i} className={`${styles.eachItem} ${ele?.featured && styles.featuredBox}`}>
                        <div className={styles.leftItem}>
                            <div className={styles.logo}>
                                <img src={ele.logoUrl} alt="" />
                            </div>
                            <div className={styles.allStory}>
                                <div className={styles.titleDetails}>
                                    <div className={styles.companyName}>{ele.name}</div>
                                    {ele?.new && <div className={styles.new}>New !</div>}
                                    {ele?.featured && <div className={styles.feature}>Featured</div>}
                                </div>
                                <div className={styles.jobTitle}>{ele.jobTitle}</div>
                                <div className={styles.jobDetails}>
                                    <div>{ele.time}</div>
                                    <div>.</div>
                                    <div>{ele.type}</div>
                                    <div>.</div>
                                    <div>{ele.location}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.middleLine}></div>
                        <div className={styles.rightItem}>
                            {
                                ele.skills.map((item, i) => (
                                    <div key={i} onClick={() => searchRoles(item)}>
                                        <div>{item}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>

    </div>
}