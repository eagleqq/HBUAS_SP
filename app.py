import sys
import codecs
sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())


from flask import Flask,render_template
from data import *

app = Flask(__name__)

college_dic = get_college_dic()

context_all_dic = get_all_json()
print(context_all_dic)
@app.route('/')
def index():
   context = context_all_dic['all']
   return render_template('index.html', **context, name_id = "全校")


@app.route('/college/<name_id>')
def college(name_id):
   try:
      # print("学院选择", college_dic[str(name_id)])
      context = context_all_dic[name_id]
      # print(context)
      return render_template('index.html', **context,name_id = college_dic[str(name_id)])
   except Exception as e:
      return "数据获取异常！" + str(e)


if __name__ == '__main__':
   app.run(debug=True,host='0.0.0.0',port='5006')







