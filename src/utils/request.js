
async function fetchWithRetry(fn,times){
    try {
        const response = await fn();
        if (!response.ok) throw new Error("请求失败");
        return await response.json();
    }catch (err){
        if (times > 0){
            return fetchWithRetry(fn,times-1);
        }else{
            throw new Error("所有请求都失败了")
        }
    }
}
