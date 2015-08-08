package com.shimelis.spring.web.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.shimelis.spring.web.dao.FormValidationGroup;
import com.shimelis.spring.web.dao.Offer;
import com.shimelis.spring.web.service.OffersService;

@Controller
public class offersController {
	
	private OffersService offersService;
	
	@Autowired
	public void setOffersService(OffersService offersService) {
		this.offersService = offersService;
	}
	@RequestMapping("/offers")
	public String showOffers(Model model){
		
		List<Offer> offers= offersService.getCurrent();
		model.addAttribute("offers", offers);
		return "offers";
	}
	
	@RequestMapping("/creatoffer")
	public String creatOffer(Model model,Principal principal){
		
		Offer offer=null;
		if(principal!=null){
			String username=principal.getName();
			 offer=offersService.getOffer(username);
		}
		
		if(offer==null){
			offer=new Offer();
		}
		model.addAttribute("offer", offer);
		return "creatoffer";
	}

	@RequestMapping("/docreate")
	public String doCreate(Model model, @Validated(FormValidationGroup.class) Offer offer,BindingResult result,Principal principal,
			@RequestParam(value="delete", required=false)String delete){
		if(result.hasErrors()){
			
			return "creatoffer";
		}
		
		if(delete==null){
			String username=principal.getName();
			offer.getUser().setUsername(username);
			
			offersService.saveOrUpdate(offer);
			return "offercreated";
		} else {
			offersService.delete(offer.getId());
			return "offerdeleted";
		}
		
		
		
	}

}
