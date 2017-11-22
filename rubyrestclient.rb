require 'rest-client'

#url = 'https://rest.yenaura.com/get_last_order'
#url = 'https://rest.yenaura.com/get_take_info/3'
#url = 'https://rest.yenaura.com/get_order/3'
url = 'https://rest.yenaura.com/get_examine_info/3'

username = 'happyrest'
secret = '1234'
response = RestClient::Request.execute method: :get, url: url, user: username, password: secret
puts response.body
File.write('D:\Downloads\getExamineInfo.json', response.body)
