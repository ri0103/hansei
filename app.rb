require 'bundler/setup'
Bundler.require
require 'sinatra/reloader' if development?
require './models.rb'
require 'sinatra'
require 'httparty'
require 'json'
require 'net/http'
require 'dotenv'
Dotenv.load

enable :sessions


helpers do
    def current_user
        User.find_by(id: session[:user])
    end
    def posts
        Post.all
    end
end

OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions'


get '/' do
    session[:test]
    erb :index
end

get '/signin' do
    erb :sign_in
end

get '/signup' do
    erb :sign_up
end

post '/signin' do
    user = User.find_by(userid: params[:userid])
    if user && user.authenticate(params[:password])
        session[:user] = user.id
        redirect '/'
    else
        redirect '/signin'
    end
end

post '/signup' do
    user = User.create(userid: params[:userid], password: params[:password],
        password_confirmation: params[:password_confirmation])
    if user.persisted?
        session[:user] = user.id
        redirect '/'
    else
        redirect '/signup'
    end
end

get '/signout' do
    session[:user] = nil
    redirect '/'
end

get '/new' do
    erb :new_post
end

post '/new' do
    
    p params[:content_set]
    
    uri = URI('https://api.openai.com/v1/chat/completions')
    req = Net::HTTP::Post.new(uri)
    req['Authorization'] = "Bearer " + ENV['OPENAI_API_KEY']
    req['Content-Type'] = 'application/json'
    
    if params[:emotional_step_select] == "kind" 
        req.body = JSON.dump({
        'messages': [{ 'role': 'user', 
            'content': "「" + params[:content_set] + "」という反省文に対して、フィードバックを一行で書いてください。また、優しく励ましてください"
            }],
            'model': 'gpt-3.5-turbo',
        })
    elsif params[:emotional_step_select] == "angry"
        req.body = JSON.dump({
        'messages': [{ 'role': 'user', 
            'content': "「" + params[:content_set] + "」という反省文に対して、フィードバックを一行で書いてください。この行動に対して厳しく叱り、命令口調でお願いします"
            }],
            'model': 'gpt-3.5-turbo',
        })
    else
        req.body = JSON.dump({
        'messages': [{ 'role': 'user', 
            'content': "「" + params[:content_set] + "」という反省文に対して、フィードバックを一行で書いてください。"
            }],
            'model': 'gpt-3.5-turbo',
        })
    end
    

    Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
    response = http.request(req)
    data_feedback = JSON.parse(response.body)
    feedback = data_feedback['choices'][0]['message']['content']


        current_user.posts.create(
            content: params[:content_set], 
            feedback: feedback)
    end
    
        redirect '/'

end

get '/view_posts' do
    @posts = posts
    erb :view_posts
end

get '/like' do
    if current_user
        if Like.find_by(user_id: session[:user], post_id: params[:id])
            Like.find_by(user_id: session[:user], post_id: params[:id]).delete
            
            returned_json = {
                like: false
            }
            json returned_json
        else
            like = Like.create(
                user_id: session[:user],
                post_id: params[:id]
                )
                
            returned_json = {
                like: true
            }
            json returned_json
        end
    end
end

get '/dislike' do
    if current_user
        if Dislike.find_by(user_id: session[:user], post_id: params[:id])
            Dislike.find_by(user_id: session[:user], post_id: params[:id]).delete
            
            returned_json = {
                dislike: false
            }
            json returned_json
        else
            dislike = Dislike.create(
                user_id: session[:user],
                post_id: params[:id]
                )
                
            returned_json = {
                dislike: true
            }
            json returned_json
        end
    end
end

get '/delete/:id' do
    posts.find(params[:id]).delete
    redirect '/'
end


