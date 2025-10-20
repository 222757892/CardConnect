// package com.cardconnect.backend.controller;

// import com.cardconnect.backend.domain.CardReport;
// import com.cardconnect.backend.repository.CardReportRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/cardreports")
// @CrossOrigin // Allows requests from your mobile app
// public class CardReportController {

//     @Autowired
//     private CardReportRepository cardReportRepository;

//     @PostMapping
//     public CardReport createCardReport(@RequestBody CardReport cardReport) {
//         return cardReportRepository.save(cardReport);
//     }

//     @GetMapping
//     public List<CardReport> getAllCardReports() {
//         return cardReportRepository.findAll();
//     }

//     @GetMapping("/{id}")
//     public CardReport getCardReportById(@PathVariable Long id) {
//         return cardReportRepository.findById(id).orElse(null);
//     }
// }