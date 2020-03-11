import json
import os
BASEPATH = os.getcwd().replace('\\', r'\\')
print(BASEPATH)

def get_college_dic():
    college_dic = {
       "all": "全校",
       "zihuan": "资环学院",
       "tujian": "土建学院",
       "yinyue": "音乐与舞蹈学院",
       "jisuanji": "计算机学院",
       "waiguoyu": "外国语学院",
       "meishu": "美术学院",
       "yixue": "医学院",
       "jixie": "机械学院",
       "jiaoyu": "教育学院",
       "wudian": "物电学院",
       "wenchuan": "文传学院",
       "jinguan": "经管学院",
       "shihua": "食化学院",
       "jiaotong": "交通学院",
       "shutong": "数统学院",
       "tiyu": "体育学院",
       "zhengfa": "政法学院"
    }
    return college_dic



def get_one_json(name):
    load_dict = {}
    path = os.path.join("static/json/", name)
    try:
        with open(path, "r",encoding='utf-8') as load_f:
           load_dict = json.load(load_f)
    except Exception as e:
        print("读取文件错误" + name)
        return {}
    return load_dict

def get_all_json():
    all_json = {}
    coll_dic = get_college_dic()
    for name in coll_dic.keys():
        one = get_one_json(name + ".json")
        all_json[name] = one
    return all_json

# if __name__ == '__main__':
#     alljson = get_all_json()
#     print(alljson["meishu"])








