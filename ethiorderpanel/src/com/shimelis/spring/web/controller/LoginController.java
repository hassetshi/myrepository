package com.shimelis.spring.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shimelis.spring.web.dao.FormValidationGroup;
import com.shimelis.spring.web.dao.Offer;
import com.shimelis.spring.web.dao.User;
import com.shimelis.spring.web.service.UsersService;

@Controller 
public class LoginController {
	
	private UsersService usersService;
	
	@Autowired 
	public void setUsersService(UsersService usersService) {
		this.usersService = usersService;
	}
	@RequestMapping("/login")
	public String showLogin() {
		return "login";
	}
	@RequestMapping("/denied")
	public String showDenied() {
		return "denied";
	}
	
	@RequestMapping("/admin")
	public String showAdmin(Model model ){
		List<User> users = usersService.getAllUsers();
		model.addAttribute("users", users);
		return "admin";
	}
	@RequestMapping("/loggedout")
	public String showLoggedOut() {
		return "loggedout";
	}
	
	@RequestMapping("/newaccount")
	public String showNewAccount(Model model) {
		model.addAttribute("user", new User());
		return "newaccount";
	}
	
		
	@RequestMapping("/createaccount")
	public String createAccount( @Validated(FormValidationGroup.class) User user,BindingResult result){
		if(result.hasErrors()){
			
			return "newaccount";
		}
		
		user.setAuthority("ROLE_USER");
		user.setEnabled(true);
		
		if(usersService.exists(user.getUsername())){
						
			result.rejectValue("username", "DuplicatKey.user.username");
			return "newaccount";
		}
		
		try{
		usersService.creat(user);
		
		}catch(DuplicateKeyException e){
			result.rejectValue("username", "DuplicatKey.user.username");
			return "newaccount";
		}
		return "accountcreated";
	}
}
